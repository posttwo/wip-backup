<template>
  <div class="hello">
    <h1>Welcome to Light Controller</h1>
    <LightSwitch domain="light" service="toggle" entity_id="light.matt"></LightSwitch>
  </div>
</template>

<script>
import { EventBus } from '@/event-bus.js'
import LightSwitch from '@/components/LightSwitch'
export default {
  name: 'Dashboard',
  methods: {
 
  },
  mounted: function() {
      //
  },
  components: {
    LightSwitch
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
