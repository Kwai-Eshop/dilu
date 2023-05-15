import { RegistrableApp, AppMetadata, Entry } from 'qiankun';
import { CollectType } from '@/collect';

export type MicroList = Array<MicroInfo>;

export type ActivityFn = (location: Location) => boolean;
export type Activity = ActivityFn | string | (ActivityFn | string)[];
export type LifeCycleEvent = (app: AppMetadata) => any;

/**
 * 子应用的生命周期
 */
export interface MicroAppLifeCycle {
  onBeforeLoad?: LifeCycleEvent;
  onBeforeMount?: LifeCycleEvent;
  onAfterMount?: LifeCycleEvent;
  onBeforeUnmount?: LifeCycleEvent;
  onAfterUnmount?: LifeCycleEvent;
}
/**
 * 子应用的Meta数据，路由级和组件级都包括的入口、生命周期、name
 */
export type MicroAppMeta = AppMetadata & MicroAppLifeCycle;

/**
 * qiankun的高阶配置
 */
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
  /**
   *  可选，是否为单实例场景，单实例指的是同一时间只会渲染一个微应用
   */
  singular?: boolean | ((app: RegistrableApp<any>) => Promise<boolean>);
  /**
   * 可选，指定部分特殊的动态加载的微应用资源（css/js) 不被 qiankun 劫持处理
   */
  excludeAssetFilter?: (url: string) => boolean;
  getPublicPath?: (entry: string) => string;
  /**
   *
   * 通过自己实现的 getTemplate 方法过滤微应用 HTML 模板中的异常脚本
   */
  getTemplate?: (tpl: string) => string;
  /**
   *
   * 通过自己实现的 fetch 方法拦截脚本请求
   */
  fetch?: (url: RequestInfo | URL, init?: RequestInit) => Promise<any>;
  /**
   * 仅仅用于路由级子应用时生效
   */
  prefetch?: string[];
}

export type RegistrableMicro = AppMetadata & {
  activeRule: Activity;
  props?: Record<string, any>;
  container: string;
  loader?: (loading: boolean) => void;
};

export type CollectLogFn = (type: CollectType, options: Record<string, any>) => void;

/**
 * 运行环境，大部分的业务或项目的运行环境都可以对应到：测试环境（test）预发环境（prepare）生成环境 （production）
 */
export enum Env {
  test = 'test',
  prt = 'prt',
  prod = 'prod',
}

export enum MicroType {
  Route = 'route',
  Component = 'component',
}

export interface MicroInfo {
  activeRule: string;
  container?: string;
  entry: Entry;
  extras?: Record<string, any>;
  extra?: Record<string, any>;

  name: string;

  type?: MicroType;
}
