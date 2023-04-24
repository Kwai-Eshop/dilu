import { createDebug, CollectType, CollectLogFn } from '@ks-dilu/core';

import {
  addErrorHandler,
  addGlobalUncaughtErrorHandler,
  removeErrorHandler,
  removeGlobalUncaughtErrorHandler,
} from '@ks-dilu/core';
import { useEffect } from 'react';

const debug = createDebug('DL:useCollectError');
/**
 * 在生命周期函数或激活函数期间每次抛出错误时，收集异常上报
 * 全局的未捕获异常上报
 * @param collect 上报方法
 * @param onError 错误回调
 */
export default (collect: CollectLogFn, onError?: (error: any) => void) => {
  useEffect(() => {
    const errorHandler = (error) => {
      collect?.(CollectType.MicroError, error);
      debug('【%s】 子应用生命周期函数或激活函数期执行出错', error?.appOrParcelName);
      onError?.(error);
    };
    const globalUncaughtErrorHandler = (error) => {
      collect?.(CollectType.GlobalUncaughtError, {
        ...error,
      });
      debug('【Error】出现全局未捕获异常：%O', error);
      onError?.(error);
    };
    addErrorHandler(errorHandler);
    addGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
    return () => {
      removeErrorHandler(errorHandler);
      removeGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
    };
  }, []);
};
