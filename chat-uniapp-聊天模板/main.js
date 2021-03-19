import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'


//socket
import VueSocketIO from 'vue-socket.io'



import  'Global.js' //引入文件


const app = new Vue({
    ...App
})
app.$mount()

//socket
Vue.use(new VueSocketIO({

    debug: false,

    connection: 'http://localhost:3000',  //服务器

}))

