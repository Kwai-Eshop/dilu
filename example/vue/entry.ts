import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from '@/App';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import { assign, isEmpty } from 'lodash';
import { LayoutUI } from '@/component/Layout';
import { DLContent } from '@/component/DLContent';
import { NotFound } from '@/component/NotFound';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LayoutUI,
      children: [
        {
          path: '/:pathMatch(.*)*',
          component: DLContent,
        },
        {
          path: '/:p(.*)*',
          component: NotFound,
        },
      ],
    },
  ],
});

const app = createApp(App);
app.use(ViewUIPlus);
app.use(router);

/**
 * 解决Vue-router 4.0和 不兼容的问题；
 */
router.beforeEach((to, from, next) => {
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath });
  }
  next();
});
app.mount('#app');
