# `@ks-dilu/react-micro`

> 微前端 react 子应用 SDK，简化微前端子应用的接入的成本，同时优化了 qiankun update 子应用的逻辑

## Install

```bash
npm install -S @ks-dilu/react-micro
```

## Usage

qiankun 的子应用都需要重复的实现 bootstrap, mount, unmount, update 的逻辑，使用 `@ks-dilu/react-micro` 大大简化了子应用的接入逻辑

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { registerDLMicro, isDLRunEnvironment, DLMicroContext } from '@ks-dilu/react-micro';

registerDLMicro({
  App: () => {
    return (
      <DLMicroContext.Consumer>
        {(value: any) => {
          console.log('gml', value);
          return <App user={value.user} sso={value.sso}></App>;
        }}
      </DLMicroContext.Consumer>
    );
  },
  rootNodeId: 'root',
});

!isDLRunEnvironment() &&
  ReactDOM.render(
    <React.StrictMode>
      <App user={{}} sso={{}} />
    </React.StrictMode>,
    document.getElementById('root'),
  );

export * from '@ks-dilu/react-micro';
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

用于获取从主应用透传的 props, 具体有什么内容，取决于主应用中的 extra;

### useDLMicroValue

获取主应用透传子应用 Props 的 hooks，

### isDLRunEnvironment

是否是在微前端的环境
