import { ActivityFn, Advanced, CollectLogFn, MicroAppLifeCycle } from '../type';

export interface ISwitchProps extends MicroAppLifeCycle {
  onError?: (...args: any[]) => void;
  onFirstMount?: () => void;
  /**
   * 可选，loading 状态发生变化时会调用的方法
   */
  loader?: (loading: boolean) => void;
  /**
   * 设置主应用启动后默认进入的微应用。
   */
  defaultMountAppLink?: string;
  /**
   * 容器Id，格式
   */
  containerId?: string;
  /**
   * 是否占用外部定义的容器DOM节点
   */
  isOccupyOuterContainer?: boolean;
  /**
   * 自定义子应用激活规则
   */
  activeFilter?: ActivityFn;
  /**
   * qiankun的高级配置
   */
  advanced?: Advanced;
  /**
   * 日志收集函数
   */
  collect?: CollectLogFn;
  /**
   * 注入到子应用的props中
   */
  extra?: Record<string, any>;
}
