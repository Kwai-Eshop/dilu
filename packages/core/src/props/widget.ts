import { Advanced, CollectLogFn, MicroAppMeta } from '@/type';

export interface IWidgetProps extends MicroAppMeta {
  /**
   * 注入到子应用的props中
   */
  extra?: Record<string, any>;
  onError?: (...args: any[]) => void;
  /**
   * qiankun的高级配置
   */
  advanced?: Advanced;

  /**
   * 日志收集函数
   */
  collect?: CollectLogFn;
  /**
   * 可选，loading 状态发生变化时会调用的方法
   */
  loader?: (loading: boolean) => void;
}
