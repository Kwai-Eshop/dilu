import { RegistrableMicro } from '@/type';
import { sanitizeActiveWhen } from './activeWhen';
import { createDebug } from './tools';

const debug = createDebug('DL:judgeActivedMicroApp');

export const judgeActivedMicroApp = (registrableMicros: Array<RegistrableMicro>) => {
  let actived = false;
  if (registrableMicros?.length) {
    actived = registrableMicros.reduce((prev: boolean, micro: RegistrableMicro) => {
      let ret: boolean = false;
      if (typeof micro?.activeRule === 'function') {
        ret = micro.activeRule(window.location);
      } else {
        // 这里是兜底逻辑，理论上，这里不应该被执行到；
        // 因为在filterMicrosByActiveRule中已经对activeRule做了转换
        ret = sanitizeActiveWhen(micro.activeRule)(window.location);
        debug(
          '【%s】 子应用的激活规则没有被转化为function, 这里走到了兜底逻辑, 规则 【%s】',
          micro.name,
          micro.activeRule,
        );
      }
      return prev || ret;
    }, false);
  }
  debug('通过judgeActivedMicroApp判断是否存在激活的应用，hasActivedMicroApp = 【%s】', actived);
  // 这里隐藏了一个坑点需要考虑，没有子应用要注册的话，就没有激活的子应用，所以actived默认为false；
  return actived;
};
