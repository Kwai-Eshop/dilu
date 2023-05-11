# 更新日志

## 0.1.2

- 修复@ks-dilu/vue2 不可以用的问题；

## 0.1.1

- 工程太大，将 example 拆分独立工程
- 废弃@ks-dilu/vue 包，拆分为@ks-dilu/vue2 和@ks-dilu/vue3
- 废弃@ks-dilu/vue-micro 包，拆分为@ks-dilu/vue2-micro 和@ks-dilu/vue3-micro

## 0.1.0-2023-03-30~04-30

- [@ks-dilu/react] 基于电商的卢 SDK 重构, 聚合乾坤的一些高阶用法参数到 advance 中
- [@ks-dilu/react] 内部集成了子应用的容器以及兜底逻辑；
- [@ks-dilu/react] 使用 CusttomEvent 替代内部 Ref 透传的通信机制；
- [@ks-dilu/react] 提供 collect 方法用户收集内部 SDK 的一些异常或相关信息
- [@ks-dilu/react] 支持通过 extra 更新子应用中数据
- [@ks-dilu/react-micro] update 更新机制升级，区分路由级和组件级应用
- [@ks-dilu/vue] 支持 3.0、2.7 以及 2.7 以下版本，功能和 react 对齐
- [@ks-dilu/vue-micro] 支持 3.0、2.7 以及 2.7 以下版本，功能和 react 对齐
- 支持通过 localstorge 启动 debug 详细的输出，方便定位和排查问题
