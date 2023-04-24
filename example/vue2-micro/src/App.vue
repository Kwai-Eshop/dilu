


<template>
  <router-view v-if="type == 'route'" />
  <Demo2 v-else />
</template>

<script >
import Vue from 'vue';
import Demo2 from './Demo2.vue'
export default Vue.extend({

  components: { Demo2 },
  inject: ['DLMicroContext'],
  computed: {
    type() {
      console.log(this.DLMicroContext);
      return this.DLMicroContext?.type ?? 'route'
    }
  },
  created() {
    console.log('create', this);
  }
});



</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

