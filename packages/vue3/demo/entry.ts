import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App, { LayoutUI, DLContent, NotFound } from './App';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import './index.less';
import { assign, isEmpty } from 'lodash';

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

router.beforeEach((to, from, next) => {
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath });
  }
  next();
});
app.mount('#app');
