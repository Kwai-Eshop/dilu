<template>
  <div style="padding:20px">
    <h1>Vue2版本路由级子应用</h1>
    <h2>随机数：{{ DLMicroContext.title || '0' }}</h2>
    <div>
      <img style="width: 300px"
        src="https://img0.baidu.com/it/u=2507528457,963649566&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500" />
    </div>
  </div>
</template>

<script >
import Vue from 'vue';

export default Vue.extend({
  name: "Demo-1",
  inject: ['DLMicroContext'],

});

</script>

