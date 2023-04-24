import { AppMetadata } from 'qiankun';
import { CollectLogFn } from '@/type';
import { CollectType, createDefaultCollect } from '@/collect';
import { createDebug } from './tools';

const debug = createDebug('DL:getLifeCycle');
const defaultCollect = createDefaultCollect(debug);
export const getLifeCycle = (
  lifeCycleHander: (name: string, app: AppMetadata) => void,
  collect: CollectLogFn = defaultCollect,
) => {
  let lifeCycle: Record<string, (app: AppMetadata) => void> = {};

  ['beforeLoad', 'beforeMount', 'afterMount', 'beforeUnmount', 'afterUnmount'].forEach((lc) => {
    lifeCycle[lc] = async (app: AppMetadata) => {
      app[lc] = Date.now();

      // 子应用卸载的时候，需要把beforeLoad的时间情况，因为下次不会走beforeLoad生命周期
      if (['beforeUnmount', 'afterUnmount'].indexOf(lc) >= 0) {
        app['beforeLoad'] = undefined;
      }
      const eventName = 'on' + lc[0].toLocaleUpperCase() + lc.substring(1);
      try {
        lifeCycleHander(eventName, app);
      } catch (e) {
        collect?.(CollectType.ERROR, e);
      }
      if (lc == 'afterMount') {
        try {
          const duration = {
            load: app['beforeLoad'] ? app['beforeMount'] - app['beforeLoad'] : 0,
            mount: app['afterMount'] - app['beforeMount'],
            total: app['afterMount'] - (app['beforeLoad'] ?? app['beforeMount']),
          };
          collect?.(CollectType.Duration, {
            ...app,
            duration,
          });
          debug('【%s】 子应用生命周期耗时: %O, 子应用信息：%O', app.name, duration, app);
        } catch (e) {
          debug('【Error】【%s】 子应用生命周期耗时计算出现异常, 子应用信息：%O', app.name, app);
        }
      }
    };
  });

  return lifeCycle;
};
