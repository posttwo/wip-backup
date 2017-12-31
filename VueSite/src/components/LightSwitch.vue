<template>
  <div class="LightSwitch" v-on:click="toggleLightSwitch"
    v-bind:class="onOffClass">
    DONT CLICK ME BRO OKAY?
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
export default {
  name: 'LightSwitch',
  props: ['domain', 'service', 'entity_id'],
  data: function(){
      return {
        on: null
      }
  },
  computed: {
      onOffClass: function (){
          if(this.on == "on")
            return "on";
          if(this.on == "off")
            return "off";
          return "";
      }
  },
  methods: {
      toggleLightSwitch: function(){
          let msg = {
              "event_type": "change_state",
              "domain": this.domain,
              "service": this.service,
              "data": {
                  "entity_id":  this.entity_id
              }
          }
          this.$socket.send(JSON.stringify(msg));
      }
  },
  mounted: function() {
      EventBus.$on("state_changed", (data) => {
          if(data.data.new_state.entity_id == this.entity_id){
              this.on = data.data.new_state.state
          }
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.LightSwitch {
    background-color:gray;
    font-size: 20px;
    height: 300px;
}
.on{
    background-color: green;
}
.off{
    background-color: red;
}
</style>
