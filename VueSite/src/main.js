// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import { EventBus } from './event-bus.js'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'ws://192.168.0.69:8080', {
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 1000, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 10, // (Number) how long to initially wait before attempting a new (1000)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted: function() {
    this.$options.sockets.onmessage = (data) => {
      let message = JSON.parse(data.data);
      console.log(message);
      EventBus.$emit(message.event_type, message);
    }
  }
})
