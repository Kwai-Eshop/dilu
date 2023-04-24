import {
  createDebug,
  ActivityFn,
  RegistrableMicro,
  sanitizeActiveWhen,
  judgeActivedMicroApp,
} from '@ks-dilu/core';

import React, { ReactNode, useMemo } from 'react';
import { createPortal } from 'react-dom';

const debug = createDebug('DL:Switch-utils');

// export const createDowngradContainer = (containerId: string) => {
//   let downgradContainer = findDowngradContainer(containerId);
//   if (downgradContainer) {
//     return downgradContainer;
//   }
//   let containerEle;
//   if (containerId && (containerEle = document.getElementById(containerId))) {
//     downgradContainer = document.createElement('div');
//     downgradContainer.setAttribute('data-dl-downgrad-container', containerEle.id);
//     const parentNode = containerEle.parentNode || document.body;
//     return parentNode.insertBefore(downgradContainer, containerEle);
//   }
// };

// export const findDowngradContainer = (containerId: string) => {
//   return document.querySelector<HTMLDivElement>(`div[data-dl-downgrad-container='${containerId}']`);
// };

// export const containerIsExists = (containerId?: string) => {
//   if (containerId && document.getElementById(containerId)) {
//     return true;
//   }
//   return false;
// };

// export const judgeActivedMicroApp = (registrableMicros: Array<RegistrableMicro>) => {
//   let actived = false;
//   if (registrableMicros?.length) {
//     actived = registrableMicros.reduce((prev: boolean, micro: RegistrableMicro) => {
//       let ret: boolean = false;
//       if (typeof micro?.activeRule === 'function') {
//         ret = micro.activeRule(window.location);
//       } else {
//         // 这里是兜底逻辑，理论上，这里不应该被执行到；
//         // 因为在filterMicrosByActiveRule中已经对activeRule做了转换
//         ret = sanitizeActiveWhen(micro.activeRule)(window.location);
//         debug(
//           '【%s】 子应用的激活规则没有被转化为function, 这里走到了兜底逻辑, 规则 【%s】',
//           micro.name,
//           micro.activeRule,
//         );
//       }
//       return prev || ret;
//     }, false);
//   }
//   debug('通过judgeActivedMicroApp判断是否存在激活的应用，hasActivedMicroApp = 【%s】', actived);
//   // 这里隐藏了一个坑点需要考虑，没有子应用要注册的话，就没有激活的子应用，所以actived默认为false；
//   return actived;
// };
/**
 * 根据子应用列表和location，判断是否存在要激活的子应用
 * @param registrableMicros
 * @returns boolean
 */
export const useHasActivedMicroApp = (registrableMicros: Array<RegistrableMicro>) => {
  return useMemo(() => {
    debug('通过useHasActivedMicroApp 调用 judgeActivedMicroApp 判断是否存在激活的应用');

    return judgeActivedMicroApp(registrableMicros);
  }, [registrableMicros]);
};

/**
 * 生成兜底的render方法
 * @param downgradChildren
 * @param registrableMicros
 * @param activeFilter
 * @returns
 */
export const createDowngradComponent = (
  downgradChildren: Array<React.ReactNode>,
  registrableMicros: Array<RegistrableMicro>,
  hasActived: boolean,
  activeFilter?: ActivityFn,
) => {
  return (
    <>
      {downgradChildren?.map((child: ReactNode, index: number) => {
        if (typeof child == 'function') {
          const state: any = {
            isActived: hasActived,
          };
          if (!registrableMicros.length || hasActived) {
            state.hasAuth = activeFilter ? activeFilter?.(window.location) : true;
          }
          return (
            <React.Fragment key={index}>
              {
                //@ts-ignore
                child(state, registrableMicros)
              }
            </React.Fragment>
          );
        } else {
          return <React.Fragment key={index}>{child}</React.Fragment>;
        }
      })}
    </>
  );
};

export const DowngradComponentPortal = (
  params: {
    downgradChildren: Array<React.ReactNode>;
    registrableMicros: Array<RegistrableMicro>;
    hasActived: boolean;
    activeFilter?: ActivityFn;
  },
  container: HTMLElement,
) => {
  const { downgradChildren, registrableMicros, hasActived, activeFilter } = params;
  const downgradComponent = createDowngradComponent(
    downgradChildren,
    registrableMicros,
    hasActived,
    activeFilter,
  );

  return createPortal(downgradComponent, container);
};
