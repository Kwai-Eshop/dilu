import './install';
import Vue from 'vue';

import VueRouter from 'vue-router';
import App from './App.vue';
import Layout from './Layout.vue';
import DLContent from './DLContent.vue';

import './index.less';
import { assign, isEmpty } from 'lodash';
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [
        {
          path: '/*',
          component: DLContent,
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (isEmpty(history.state.current)) {
//     assign(history.state, { current: from.fullPath });
//   }
//   next();
// });

new Vue({
  router,
  render: (h: any) => h(App),
}).$mount('#root_app');
