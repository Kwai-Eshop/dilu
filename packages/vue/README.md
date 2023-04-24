## @ks-dilu/vue

的卢微前端 React 版本的主应用组件化 SDK，分别从`路由级` `组件级`子应用视角出发，介绍如何通过 SDK 来将应用接入微前端框架

## 安装依赖

#### Vue3

```shell
$ npm install -S @ks-dilu/vue
```

如果业务是 Vue2.7 版本的，需要安装 vue-demi; 2.7 以下的还需要安装 @vue/composition-api；

#### Vue2

```shell
$ npm install -S vue-demi @vue/composition-api @ks-dilu/vue

```

## 路由级 DLRouter

**Vue3**

```tsx

import { DLRouter } from '@ks-dilu/vue';


const micros = [{
  activeRule: '/zone';
  entry: 'https://xxx.cdn.com/xx',
  name: 'test1',
},{
  activeRule: '/zone';
  entry: 'https://xxx.cdn.com/xx',
  name: 'test1'
}]

const App = () => {
  return (
    <DLRouter
      fetchMicros={async () => {
        return micros;
      }}
    ></DLRouter>
  );
};

```

**Vue2**

```vue
<template>
  <div class="home">
    <DLRouter :fetchMicros="fetchMicros">
      <template v-slot:default="slotProps">
        <div>
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
  name: 'DLContent',

  methods: {
    fetchMicros() {
      return Promise.resolve(RouteMicros);
    },
  },
  components: { DLRouter },
});
</script>
```

通过上面的 Demo 可以非常方便的完成主应用的接入微前端框架, 并且路由劫持，根据激活规则展现子应用；

**Props**

属性说明如下

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| extra | 会透传给子应用，配合@ks-dilu/react-micro 可以实现子应用数据通信 | object |  | 否 |
| loader | 状态发生变化时会调用的方法 | function |  | 否 |
| defaultMountAppLink | 设置主应用启动后默认进入的微应用 | string |  | 否 |
| containerId | 容器 Id | string |  | 否，配合 isOccupyOuterContainer = true 时,需要指定，并且该 ID 的 Dom 要存在 |
| isOccupyOuterContainer | 是否使用外部定义的容器 DOM 节点 | string | false | 否 |
| collect | 日志收集函数 | CollectLogFn | (type, opts) => void | 否 |
| activeFilter | 子应用激活过滤器，必须是同步纯函数 | ActivityFn |  | 否 |
| onBeforeLoad | 子应用开始加载前触发 | function |  | 否 |
| onBeforeMount | 子应用开始挂载前触发 | function |  | 否 |
| onAfterMount | 子应用挂载完成触发 | function |  | 否 |
| onBeforeUnmount | 子应用开始卸载销毁前触发 | function |  | 否 |
| onAfterUnmount | 子应用卸载销毁触发 | function |  | 否 |
| onFirstMount | 第一个子应用 mount 调用 | function |  | 否 |
| onError | 添加全局的未捕获异常处理器 | function |  | 否 |
| advanced | qiankun 的高级配置 | Advanced |  | 否 |
| fetchMicros | 获取要注册的子应用 | async () => MicroInfo[] |  | 是 |

## 组件级 DLWidget

**Vue3**

```tsx
import { createRoot } from 'react/client';
import { DLRouter } from '@ks-dilu/react';

const App = () => {
  return <DLWidget entry="https://xxx.cdn.com/xx" name="test1"></DLWidget>;
};

const container = createRoot(document.getElementById('main_root_id'));

container.render(<App />);
```

**Vue2**

```vue
<template>
  <div class="wrap">
    <DLWidget ref="DLWidgetInstance" :extra="extra" :name="name" :entry="entry"></DLWidget>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DLWidget } from '@ks-dilu/vue/v2';

export default Vue.extend({
  components: {
    DLWidget,
  },
  props: {
    name: String,
    entry: String,
  },
  data() {
    return {
      extra: {
        title: '开始了',
        type: 'widget',
      },
    };
  },
});
</script>
<style lang="less" scoped>
.wrap {
  width: 400px;
}
</style>
```

通过上面的 Demo，可以手动加载指定的子应用；

**Props**

属性说明如下

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| extra | 会透传给子应用，配合@ks-dilu/react-micro 可以实现子应用数据通信 | object |  | 否 |
| loader | 状态发生变化时会调用的方法 | function |  | 否 |
| collect | 日志收集函数 | CollectLogFn | (type, opts) => void | 否 |
| onBeforeLoad | 子应用开始加载前触发 | function |  | 否 |
| onBeforeMount | 子应用开始挂载前触发 | function |  | 否 |
| onAfterMount | 子应用挂载完成触发 | function |  | 否 |
| onBeforeUnmount | 子应用开始卸载销毁前触发 | function |  | 否 |
| onAfterUnmount | 子应用卸载销毁触发 | function |  | 否 |
| onError | 添加全局的未捕获异常处理器 | function |  | 否 |
| name | string | 唯一的标识 |  | 是 |
| entry | Entry | 唯一的标识 |  | 是 |
| advanced | qiankun 的高级配置 | Advanced |  | 否 |

## Props 中类型说明

Advanced 说明

| 属性 | 说明 | 类型 | 默认值 | 必填 |
| --- | --- | --- | --- | --- |
| prefetch | 是否开启预加载， 仅仅用于路由级子应用时生效 | boolean | false |  |
| fetch | 自定义的 fetch 方法 | function | - |  |
| sandbox | 是否开启沙箱 | boolean 或 `{strictStyleIsolation?: boolean, experimentalStyleIsolation?: boolean}` | true |  |
| singular | 是否为单实例场景，单实例指的是同一时间只会渲染一个微应用 | boolean | true |  |
| excludeAssetFilter | 指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理 | function |  |  |
| getPublicPath | 参考 [qiankun](https://qiankun.umijs.org/zh/api#startopts) | function |  |  |
| getTemplate | 通过自己实现的 getTemplate 方法过滤微应用 HTML 模板中的异常脚本 | function |  |  |

```typescript
// 参考乾坤文档
export interface Advanced {
  /**
   * 是否开启沙箱，默认为 true
   */
  sandbox?:
    | boolean
    | {
        strictStyleIsolation?: boolean;
        experimentalStyleIsolation?: boolean;
      };
  singular?: boolean | ((app: RegistrableApp<any>) => Promise<boolean>);
  excludeAssetFilter?: (url: string) => boolean;
  getPublicPath?: (entry: string) => string;
  getTemplate?: (tpl: string) => string;
  fetch?: (url: RequestInfo | URL, init?: RequestInit) => Promise<any>;
  /**
   * 仅仅用于路由级子应用时生效
   */
  prefetch?: string[];
}

export interface MicroInfo {
  activeRule: string;
  entry: Entry;
  extra?: Record<string, any>;
  name: string;
  type?: MicroType;
}

export enum MicroType {
  Route = 'route',
  Component = 'component',
}

export type CollectLogFn = (type: CollectType, options: Record<string, any>) => void;
```
