<template>
  <div class="hello">
    <h1>Welcome to Light Controller</h1>
    <h2>Please Authenthicates</h2>
        <button v-on:click="authenthicateWithWebsocket">Authenthicate</button>
    <h2>Test System</h2>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
export default {
  name: 'Index',
  methods: {
      authenthicateWithWebsocket: function() {
          let msg = {
              "event_type": "auth_request",
              "data": {
                  "label": "DEVCONSOLE"
              }
          }
          this.$socket.send(JSON.stringify(msg));
      }
  },
  mounted: function() {
      EventBus.$on("auth_acknowledge", (data) => {
          if(data.success){
              this.$router.push('dashboard')
          }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
