<template>
  <div class="container">
    <div class="header">
      <div class="logo">
        <!-- <img src="https://v2.cn.vuejs.org/images/logo.svg" /> -->
        <span class="logo-title">Vue2 Main Demo</span>
      </div>
    </div>
    <div class="content-wrap">
      <div class="sidebar">
        <div>
          <h1>路由组件</h1>
          <p>
            <router-link to="/zone/1">zone/1</router-link>
          </p>
          <p>
            <router-link to="/zone/2">zone/2</router-link>
          </p>
          <p>
            <router-link to="/zone-origin/1">zone-origin/1</router-link>
          </p>
          <p>
            <router-link to="/zone-origin/2">zone-origin/2</router-link>
          </p>
          <p>
            <router-link to="/vue3/1">vue3/1</router-link>
          </p>
          <p>
            <router-link to="/vue3/404">vue3/404</router-link>
          </p>
          <p>
            <router-link to="/zoneeee/2">不存在的路由</router-link>
          </p>
        </div>
      </div>
      <div class="content">
        <router-view />
        <DLWidgetContent name="1" entry="https://localhost:9000" />
        <DLWidgetContent name="2" entry="https://localhost:9001" />
        <DLWidgetContent name="3" entry="https://localhost:9003" />


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { DLWidgetContent } from '../demo/DLWidgetContent';
import Vue from 'vue';
import { RouterLink } from 'vue-router';

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: { DLWidgetContent }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
