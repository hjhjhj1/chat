var app = require('express')();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
let uids = {}; //用户和对应房间的集合
let isNewRoom; //是否第一个进入，是=uid，否=null

//监听connection（用户连接）事件，socket为用户连接的实例
io.on('connection', (socket) => {
	console.log("用户" + socket.id + "连接");


	//监听用户断开事件
	socket.on('disconnect', () => {
		console.log("用户" + socket.id + "意外退出");
		  socket.join(socket.id , () => {
		  });
		
	});
	
	
	// 当客户端断开连接（但尚未离开rooms）时触发
	 socket.on('disconnecting', (reason) => {
		 console.log('未离开room断开',socket.id);
	    // let rooms = Object.keys(socket.rooms);
	    // ...
	  });


	// 断开请求
	socket.on('setDisconnect',(uid)=>{
		console.log('断开---',uid,uids);
		// 1.获取两人id
		let room=uids[uid].to; //对方
		// let room2=uids[room].to;	//发送的人

		
		// 2.双方匹配的人设为null
		uids[room]=null;
		uids[uid]=null;
		
		
		// 3.给对方发送对方已离开
		io.to(room).emit('goAway',
			{ type: 'system', msg: { id: 0, type: 'text', content: { text: '对方已离开'} } }
		);
		
		
		
	});
	
	


	//重连
	socket.on('newConnection', (id,newId) => {
		// console.log(uids,'老');
		// 新id替换旧id
		let laoId=uids[id];//老匹配的人
		try{
			let laoid2=uids[laoId.to] ; //自己
		}catch(e){
			//TODO handle the exception
		}
		
		
		uids[newId]=laoId;//老匹配的人给自己
		try{
			uids[laoId.to].to=newId //老匹配人跟新为自己
		}catch(e){
			//TODO handle the exception
		}
		
		uids[id]=null;//自己老id=null
		// console.log(uids,'新');
	});






	//匹配请求
	socket.on('Matching', (myuid) => {
		
		//判断房间状态
		if (isNewRoom) {
			console.log('匹配成功');
			
			//2.匹配到的人互相绑定
			uids[myuid] = {
				to:isNewRoom,
				sex:''
			};
			uids[isNewRoom]={
				to:myuid,
				sex:''
			};
			
			// 3.双方返回匹配成功
			io.to(myuid).emit('cancelWait', { type: 'system', msg: { id: 0, type: 'text', content: { text: '匹配成功！对方信息：' +isNewRoom} } });
			io.to(isNewRoom).emit('cancelWait', 
				{ type: 'system', msg: { id: 0, type: 'text', content: { text: '匹配成功！对方信息：' +myuid} } }
			
			);
			console.log(uids);
			
			
			//3.加入后把房间关闭
			isNewRoom = null;
			

		} else {
			
			//1.isNewRoom设置为第一个人的id
			isNewRoom=myuid
			console.log('等待：', myuid);
		}



	});










	//客户端消息
	socket.on('sendMsg', (obj) => {
		
		
		//收到信息,发送给匹配的两人
		console.log(uids);
		
		// 1.获取两人id
		let room=uids[obj.uid].to; //接收的人
		// let room2=uids[room].to;	//发送的人
		
		
		// 2.发送私人消息
		
		//写到刷新后直接无法收到消息
		// io.to(obj.uid).emit('message', obj);
		io.to(room).emit('message', obj);
		
		
		// console.log('客户端：', obj.content, obj.type, obj.uid);
		console.log(obj.uid+">>>>>>"+room);
	});



});

http.listen(port, function() {
	console.log('listening on *:' + port);
});


