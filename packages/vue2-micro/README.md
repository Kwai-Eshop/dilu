# `@ks-dilu/vue-micro`

> 微前端 vue 子应用 SDK，简化微前端子应用的接入的成本，同时优化了 qiankun update 子应用的逻辑，其中针对 update 做了重点优化，实现可以通过 props 更新组件，而不是通过卸载再挂载的方式实现组件的更新；

## Install

如果业务是 Vue3

#### Vue3

```shell
$ npm install -S @ks-dilu/vue-micro
```

如果业务是 Vue2.7 版本的，需要安装 vue-demi; 2.7 以下的还需要安装 @vue/composition-api；

#### Vue2

```shell
$ npm install -S vue-demi @vue/composition-api @ks-dilu/vue-micro

```

## Usage

qiankun 的子应用都需要重复的实现 bootstrap, mount, unmount, update 的逻辑，使用 `@ks-dilu/react-micro` 大大简化了子应用的接入逻辑

#### Vue3

```js
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
```

#### Vue2

```tsx
import Vue from 'vue';
//@ts-ignore
import { registerDLMicro } from '@ks-dilu/vue-micro/v2';
import VueRouter from 'vue-router';
import App from './App.vue';
import Demo from './Demo.vue';
import Demo2 from './Demo2.vue';
import './index.less';
import { assign, isEmpty } from 'lodash';

Vue.use(VueRouter);

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
```

## API

### registerDLMicro

- 参数：（options, isRenderByNonDLEnvironment）=> {mount, update, unmount, bootstrap}
- 描述：封装了 qiankun 子应用的逻辑，该方法收敛注册子应用的逻辑
- isRenderByNonDLEnvironment 是否在非的卢环境下自动挂载应用，默认 false
- options 参数说明

| 参数 | 类型 | 描述 | 必填 | 默认值 |
| --- | --- | --- | --- | --- |
| App | ReactElement、FunctionComponent 、React.FC<any> | 子应用的入口 | 必填 |  |
| rootNodeId | string | 子应用的根节点 Id | 必填 |  |
| vueAppCb | function | 实例化 vue 时的回调，用于挂载 vue 的插件等，vue2 和 vue3 有细微差别，可以查看相关 demo 的使用 | 选填 |  |

### DLMicroContext

用于获取从主应用透传的 props, 具体有什么内容，取决于主应用中的 extra; 可以在组件中通过 `inject`获取到该值

### isDLRunEnvironment

是否是在微前端的环境
