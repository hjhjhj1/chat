<template>
	<view>
		<input type="text" v-model="input"/>
		<button type="default" @click="sendSocketMessage">send</button>
		<button type="warn" @click="guan">关闭</button>
	</view>
</template>

<script>
uni.connectSocket({
				url: 'http://localhost:3000'
			});
	uni.onSocketOpen(function(res) {
		console.log('WebSocket连接已打开！');
	});
	uni.onSocketError(function(res) {
		console.log('WebSocket连接打开失败，请检查！',res);
	});
	uni.onSocketMessage(function (res) {
	  console.log('收到服务器内容：' + res.data);
	});
	uni.onSocketClose(function (res) {
	  console.log('WebSocket 已关闭！');
	});
	export default {
		data() {
			return {
				input:""
			};
		},
		methods: {
			sendSocketMessage(msg) {
					uni.sendSocketMessage({
						data: this.input,
						success() {
							console.log('成功');
						},
						fail() {
							console.log('失败');
						}
					});
			},
			
			guan(){
				uni.closeSocket()
			}
			
		},
		onLoad() {
			
			
			
		},
	}
</script>

<style lang="scss">
input{
	border: 1px solid #F0AD4E;
}
</style>
