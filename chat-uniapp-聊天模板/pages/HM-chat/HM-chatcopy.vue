<template>
	<view class="">
		<!-- <keep-alive> -->
			<socket></socket>
		<!-- </keep-alive> -->
	</view>
</template>
<script>
	
	// 写到刷新后id不对，msglist位置错误
	import socket from '@/commom/socket/socket'
	// import socket from './socket.vue'
export default {
	 components: {
	    socket
	  },
	data() {
		return {}
	},
	onLoad() {
		// console.log('onLoad----------');
	}
};
</script>
<style lang="scss">

</style>
