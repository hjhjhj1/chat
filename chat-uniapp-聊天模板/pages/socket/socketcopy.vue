<template>
	<view>
		<input type="text" v-model="input" />
		<button type="default" @click="sendSocketMessage">send</button>
		<button type="warn" @click="guan">关闭</button>
	</view>
</template>

<script>
	// var io = require('@/static/view-source_https___cdn.socket.io_socket.io-1.7.3.js') 删掉了
	var socket = io('http://localhost:3000');
	socket.on('connectToRoom', (fmsg)=> {
		console.log(fmsg);
	});
	export default {
		data() {
			return {
				input: ""
			};
		},
		methods: {
			sendSocketMessage(msg) {
				socket.emit('chat message', this.input);
			},

			guan() {
				// uni.closeSocket()
			}

		},
		onLoad() {



		},
	}
</script>

<style lang="scss">
	input {
		border: 1px solid #F0AD4E;
	}
</style>
