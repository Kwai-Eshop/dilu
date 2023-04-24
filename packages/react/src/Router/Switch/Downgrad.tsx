import { createDebug } from '@ks-dilu/core';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const debug = createDebug('DL:DowngradPortal');
export interface DowngradProps {
  children: React.ReactNode;
  root?: string | HTMLElement | null;
}

export const DowngradPortal = (props: DowngradProps) => {
  const { children, root } = props;
  const eleRef = useRef<HTMLDivElement>();

  const getEle = () => {
    if (!eleRef?.current) {
      eleRef.current = document.createElement('div');
    }
    return eleRef.current;
  };
  useEffect(() => {
    const container = typeof root == 'string' ? document.getElementById(root) : root;
    const el = getEle();
    debug('挂载兜底降级组件，降级容器%O：', container);
    container?.appendChild(el);

    let microContainer;
    let originStyle;

    try {
      if (container && container?.dataset?.dlDowngradContainer) {
        microContainer = document.getElementById(container?.dataset?.dlDowngradContainer);
        originStyle = microContainer.style;
        microContainer.style.opacity = 0;
        microContainer.style.overflow = 'hidden';
        microContainer.style.height = '0';
      }
    } catch (e) {
      debug('【Error】设置子应用容器Style异常：%O', e);
    }

    return () => {
      container?.removeChild(getEle());
      debug('卸载载兜底降级组件, 降级容器%O:', container);
      if (microContainer) {
        //@ts-ignore
        microContainer.style = { ...originStyle };
      }
    };
  }, []);

  return ReactDOM.createPortal(children, getEle());
};
