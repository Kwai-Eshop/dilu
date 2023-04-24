import { ActivityFn, RegistrableMicro } from '@/type';
import { sanitizeActiveWhen } from './activeWhen';

/**
 *
 * @param micros  过滤激活规则，并转换为激活函数；
 * @param activeFilter 外部用户自定义激活规则；
 * @returns
 */
export const filterMicrosByActiveRule = (
  micros: Array<RegistrableMicro>,
  activeFilter: ActivityFn = (_location: Location) => true,
): any => {
  const nameActiveMapper = new Map();
  const microList: Array<RegistrableMicro> = [];

  // 多重路由 activeRule 拆解，避免重复
  micros.forEach((micro) => {
    if (typeof micro.activeRule === 'string') {
      const filterRule: string[] = [];
      let activeRuleList: string[] = micro.activeRule.split(',');
      while (activeRuleList.length) {
        const rule = activeRuleList.pop();
        if (!nameActiveMapper.get(rule)) {
          nameActiveMapper.set(rule, micro.name);
          filterRule.push(rule as string);
        }
      }
      microList.push({
        ...micro,
        activeRule: (location: Location) => {
          const activeWhen = sanitizeActiveWhen(filterRule);
          return activeWhen(location) && activeFilter(location);
        },
      });
    }
  });
  return microList;
};
