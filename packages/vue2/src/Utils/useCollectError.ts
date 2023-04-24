import {
  addErrorHandler,
  addGlobalUncaughtErrorHandler,
  removeErrorHandler,
  removeGlobalUncaughtErrorHandler,
  createDebug,
  CollectType,
  type CollectLogFn,
} from '@ks-dilu/core';
import { onBeforeMount, onUnmounted } from '@vue/composition-api';

const debug = createDebug('DL:Vue-useCollectError');

export default (collect: CollectLogFn, onError?: (error: any) => void) => {
  const errorHandler = (error: any) => {
    collect?.(CollectType.MicroError, error);
    debug('【%s】 子应用生命周期函数或激活函数期执行出错 %O', error?.appOrParcelName, error);
    onError?.(error);
  };
  const globalUncaughtErrorHandler = (error: any) => {
    collect?.(CollectType.GlobalUncaughtError, {
      ...error,
    });
    debug('【Error】出现全局未捕获异常：%O', error);
    onError?.(error);
  };

  onBeforeMount(() => {
    addErrorHandler(errorHandler);
    addGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
  });

  onUnmounted(() => {
    removeErrorHandler(errorHandler);
    removeGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
  });
};
