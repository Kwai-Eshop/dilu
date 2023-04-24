import React, { useMemo } from 'react';
import { RouteAppContainer } from '@/Container';
import { createDebug, containerRandomId } from '@ks-dilu/core';
import BootstrapComponent, { SwitchProps } from './Bootstrap';

const debug = createDebug('DL:Switch');

export { SwitchProps };

export const DLSwitch = (props: SwitchProps) => {
  const { containerId, isOccupyOuterContainer, children, ...restProps } = props || {};

  const isUseOuterContainer = useMemo(() => {
    let flag = false;
    if (isOccupyOuterContainer) {
      if (containerId) {
        flag = true;
      } else {
        debug('isOccupyOuterContainer 为true时没有设置containerId，所以不启用外部容器');
        flag = false;
      }
    } else {
      flag = false;
    }
    debug('是否启用使用外部容器的能力: 【%s】', flag);
    return flag;
  }, [containerId, isOccupyOuterContainer]);

  const wrapperId = useMemo(() => {
    return containerId || containerRandomId;
  }, [containerId]);

  return (
    <RouteAppContainer containerIdentity={isUseOuterContainer ? '' : wrapperId}>
      <BootstrapComponent
        {...restProps}
        containerId={wrapperId}
        isOccupyOuterContainer={isUseOuterContainer}
      >
        {children}
      </BootstrapComponent>
    </RouteAppContainer>
  );
};
