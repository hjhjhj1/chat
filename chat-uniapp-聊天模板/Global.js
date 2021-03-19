import vue from 'vue'
vue.prototype.$getStorageSync=function(name){
	try{
		let a = uni.getStorageSync(name);
		return a;
	}catch(e){
		console.log('获取缓存失败')
		//TODO handle the exception
	}
}
