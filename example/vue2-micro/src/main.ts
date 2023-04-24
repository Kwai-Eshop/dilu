import './install';
import Vue from 'vue';
//@ts-ignore
import { registerDLMicro } from '@ks-dilu/vue-micro/v2';

import VueRouter from 'vue-router';
import App from './App.vue';
import Demo from './Demo.vue';
import Demo2 from './Demo2.vue';

import './index.less';
import { assign, isEmpty } from 'lodash';

registerDLMicro(
  {
    rootNodeId: 'root_app',
    App: App,
    vueAppCb(props: { basename: any }) {
      const router = new VueRouter({
        mode: 'history',
        base: props?.basename || '/',
        routes: [
          {
            path: '/1',
            component: Demo,
          },
          {
            path: '/2',
            component: Demo2,
          },
        ],
      });
      return {
        router,
      };
    },
  },
  true,
);
//@ts-ignore
export * from '@ks-dilu/vue-micro/v2';

// router.beforeEach((to, from, next) => {
//   if (isEmpty(history.state.current)) {
//     assign(history.state, { current: from.fullPath });
//   }
//   next();
// });

// new Vue({
//   router,
//   render: (h: any) => h(App),
// }).$mount('#root_app');
