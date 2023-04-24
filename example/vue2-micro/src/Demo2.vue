<template>
  <div>
    <h1>Vue2版本的组件级子应</h1>
    <h2>随机数：{{ DLMicroContext.title }}</h2>
    <div>
      <img style="height: 200px"
        src="https://img2.baidu.com/it/u=2270678657,833306474&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800" />
    </div>
  </div>
</template>

<script >

import Vue from 'vue';

export default Vue.extend({
  name: "HelloWorld",
  inject: ['DLMicroContext'],

  created() {
    console.log(this);
  }

});

</script>
