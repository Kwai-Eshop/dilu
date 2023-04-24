export enum CollectType {
  ERROR = 'ERROR',
  MicroError = 'MicroError',
  GlobalUncaughtError = 'GlobalUncaughtError',
  Duration = 'Duration',
}

/**
 * 创建默认的日志收集函数
 * @param debug
 * @returns
 */
export const createDefaultCollect =
  (debug: (formatter: any, ...args: any[]) => void) =>
  (type: CollectType, opts: Record<string, any>) => {
    debug('默认的Collect处理函数: type is 【%s】, opts is %O', type, opts);
  };
