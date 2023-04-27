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
