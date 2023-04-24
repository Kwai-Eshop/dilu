<template>
  <div class="wrap">
    <button @click="propsClick">
      props更新
    </button>
    <button @click="updateClick">
      update更新
    </button>
    <DLWidget ref="DLWidgetInstance" :extra="extra" :name="name" :entry="entry"></DLWidget>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DLWidget } from '@ks-dilu/vue/v2';

export default Vue.extend({
  components: {
    DLWidget
  },
  props: {
    name: String,
    entry: String
  },
  data() {
    return {
      extra: {
        title: '开始了',
        type: 'widget'
      }
    }
  },
  methods: {
    propsClick() {
      this.extra.title = Math.random().toString();

    },
    updateClick() {
      console.log(this);
      const update = this?.$refs?.DLWidgetInstance?.update;
      debugger;
      update?.({ props: { title: Math.random().toString() } });
    }
  }
})
</script>
<style lang="less" scoped>
.wrap {
  width: 400px;
}
</style>
