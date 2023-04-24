<template>
  <div class="home">
    <DLRouter :fetchMicros="fetchMicros">
      <template v-slot:default="slotProps">
        <div >
          {{ slotProps.state }}
        </div>
      </template>
    </DLRouter>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DLRouter, type DLRouterProps } from '@ks-dilu/vue/v2';
import { RouteMicros } from './micros';


export default Vue.extend({
  name: "HelloWorld",

  methods: {
    fetchMicros() {
      return Promise.resolve(RouteMicros);
    }
  },
  components: { DLRouter }
});

</script>

