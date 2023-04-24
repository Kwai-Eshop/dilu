import { registerDLMicro } from '@ks-dilu/vue-micro';
import { createRouter, createWebHistory } from 'vue-router';
import ViewUIPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
import App, { NotFound } from './App';
import Demo from '@/components/Demo';
import { createApp, defineComponent } from 'vue';

registerDLMicro(
  {
    rootNodeId: 'app',
    vueAppCb: (app: any, props: any) => {
      const router = createRouter({
        history: createWebHistory(props?.basename || '/'),
        routes: [
          {
            path: '/1',
            component: Demo,
          },
          {
            path: '/:p(.*)*',
            component: NotFound,
          },
        ],
      });
      app.use(router);

      app.use(ViewUIPlus);
    },
    App: App,
  },
  true,
);

export * from '@ks-dilu/vue-micro';
