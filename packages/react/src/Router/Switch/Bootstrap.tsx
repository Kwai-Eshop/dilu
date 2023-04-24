import React, { useCallback, useEffect, useState } from 'react';
import { RouteAppProps } from '@/Router/Route';
import {
  createDebug,
  ISwitchProps,
  RegistrableMicro,
  AppMetadata,
  registerMicroApps,
  setDefaultMountApp,
  start,
  filterMicrosByActiveRule,
  CollectType,
  createDefaultCollect,
  MicroAppStateActions,
  initGlobalState,
  judgeActivedMicroApp,
  getLifeCycle,
  containerIsExists,
  createDowngradContainer,
  findDowngradContainer,
} from '@ks-dilu/core';
import memoizeOne from 'memoize-one';
import { useHasActivedMicroApp, createDowngradComponent } from './utils';
import useCollectError from '@/Utils/useCollectError';

import { DowngradPortal } from './Downgrad';

// memoize-one

export interface SwitchProps extends ISwitchProps {
  children?: React.ReactNode;
}

const debug = createDebug('DL:Switch');

const defaultCollect = createDefaultCollect(debug);

const microAppStateActions: MicroAppStateActions = initGlobalState({});

export default (props: SwitchProps) => {
  const {
    children,
    containerId,
    onFirstMount = () => {},
    extra: switchExtra = {},
    collect = defaultCollect,
  } = props || {};

  const [registrableMicros, setRegistrableMicros] = useState<Array<RegistrableMicro>>([]);
  const [downgradMicros, setDowngradMicros] = useState<Array<React.ReactNode>>([]);
  const [hasActivedMicroApp, setHasActivedMicroApp] = useState<boolean>(true);

  const firstMountListener = useCallback(() => {
    debug('第一个微应用完成挂载（Mount）');
    onFirstMount?.();
    window.removeEventListener('single-spa:first-mount', firstMountListener);
  }, []);

  useEffect(() => {
    let micros: Array<RegistrableMicro> = [];
    // let microMap: Record<string, Omit<RouteAppProps, 'children'>>;

    // 没有name、entry、activeRule的DLRoute的children;
    let notFoundMicros: React.ReactNode[] = [];

    /**
     * 收集DLRoute组件，生成子应用注册列表；
     */
    React.Children.forEach(children, (child: React.ReactNode) => {
      if (React.isValidElement(child)) {
        const childProps: RouteAppProps = child?.props || {};
        const { name, entry, activeRule, extra, extras } = childProps;
        if (name && entry && activeRule) {
          const micro: RegistrableMicro = {
            name,
            entry,
            container: `#${containerId}`,
            activeRule,
            loader: props?.loader,
            props: {
              diluRouteActiveRule: activeRule,
              ...switchExtra,
              ...extras,
              ...extra,
            },
          };
          micros.push(micro);
        } else if (childProps?.children) {
          notFoundMicros.push(childProps?.children);
        }
      }
    });

    debug('完成子应用信息的收集：%O', micros);
    micros = filterMicrosByActiveRule(micros, props?.activeFilter);
    debug('完成子应用激活规则去重过滤：%O', micros);

    setRegistrableMicros(micros);
    setDowngradMicros(notFoundMicros);

    debug('初始化时，判断是否存在激活的应用');
    setHasActivedMicroApp(judgeActivedMicroApp(micros));

    debug('存在%d个兜底组件', notFoundMicros.length);

    let lifeCycle: Record<string, (app: AppMetadata) => void> = getLifeCycle(
      (lifeCycleName, app: AppMetadata) => {
        if (typeof props?.[lifeCycleName] === 'function') {
          props[lifeCycleName](app);
        }
      },
      collect,
    );

    registerMicroApps(micros, lifeCycle);
    debug('完成子应用注册');

    if (props?.defaultMountAppLink) {
      debug('设置默认进入的子应用：【%s】', props?.defaultMountAppLink);
      setDefaultMountApp(props.defaultMountAppLink);
    }
    start(props?.advanced);
    const beforeRoutingEventListener = memoizeOne((e) => {
      const { newUrl, oldUrl } = e.detail;
      if (newUrl != oldUrl && micros.length) {
        debug('通过single-spa:before-routing-event 调用 judgeActivedMicroApp');
        setHasActivedMicroApp(judgeActivedMicroApp(micros));
      }
    });
    window.addEventListener('single-spa:before-routing-event', beforeRoutingEventListener);
    window.addEventListener('single-spa:first-mount', firstMountListener);
    return () => {
      window.removeEventListener('single-spa:first-mount', firstMountListener);
      window.removeEventListener('single-spa:before-routing-event', beforeRoutingEventListener);
    };
  }, [children, containerId]);

  // 在生命周期函数或激活函数期间每次抛出错误时，收集异常上报;全局的未捕获异常上报
  useCollectError(collect, props?.onError);

  useEffect(() => {
    microAppStateActions.setGlobalState(switchExtra);
    return () => {
      microAppStateActions.offGlobalStateChange();
    };
  }, [switchExtra]);

  useEffect(() => {
    // 为子应用的容器添加兜底逻辑的容器
    if (containerId && containerIsExists(containerId)) {
      debug('为子应用容器【%s】创建兜底DOM', containerId);
      createDowngradContainer(containerId);
    } else if (props.isOccupyOuterContainer) {
      debug('没有找到指定的子应用的容器：【%s】', containerId);
    }
  }, []);

  return (
    <>
      {!!(registrableMicros.length && !hasActivedMicroApp) ? (
        <DowngradPortal root={findDowngradContainer(containerId as string)}>
          {createDowngradComponent(
            downgradMicros,
            registrableMicros,
            hasActivedMicroApp,
            props?.activeFilter,
          )}
        </DowngradPortal>
      ) : null}
    </>
  );
};
