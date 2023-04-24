import ReactDOM from 'react-dom';
import React, { FunctionComponent, ReactElement, useContext, useEffect, useState } from 'react';
import { isMicro as isDLRunEnvironment, polyfillCustomEvent } from './util';

polyfillCustomEvent();

export type DLMicroLifecyleFunc = (params?: any) => Promise<any | void>;
export type DLMicroLifecyleItem = DLMicroLifecyleFunc | undefined;

export type RegisterMicroArgs = {
  rootNodeId: string;
  App: ReactElement | FunctionComponent | React.FC<any>;
  bootstrap?: DLMicroLifecyleItem;
  unmount?: DLMicroLifecyleItem;
};

export type DLMicroLifecyle = {
  mount: DLMicroLifecyleFunc;
  update: DLMicroLifecyleFunc;
  unmount: DLMicroLifecyleFunc;
  bootstrap: DLMicroLifecyleFunc;
};
const initContextValue: Record<string, any> = {};

const DLMicroContext = React.createContext(initContextValue);

const propsChangeEventName = 'propsChange' + Math.random() + Date.now();

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
const triggerCustomEvent = (props: Record<string, any>) => {
  var event = new CustomEvent(propsChangeEventName, { detail: { ...props } });
  document.dispatchEvent(event);
};

let AppCmp: any = () => <></>;
let _rootNode: string = 'root';
let _bootstrap: DLMicroLifecyleItem;
let _unmount: DLMicroLifecyleItem;
let react18Root: {
  render(children: React.ReactNode): void;
  unmount(): void;
};

// 是否完成了注册，如果没有，不可以调用子应用的生命周期
let hadRegister = false;

const getRootContainer = (container: any) => {
  return container ? container.querySelector('#' + _rootNode) : document.getElementById(_rootNode);
};

const MicroAppContainer: React.FC<Record<string, any>> = (props: Record<string, any>) => {
  const { children, ...restProps } = props;
  const [childrenProps, setChildrenProps] = useState(restProps);

  useEffect(() => {
    // let propsChangeEvent = new CustomEvent("propsChange");
    const handler = (e: any) => {
      setChildrenProps({
        ...childrenProps,
        ...e?.detail,
      });
      document.removeEventListener(propsChangeEventName, handler);
    };
    document.addEventListener(propsChangeEventName, handler);
    return () => {
      document.removeEventListener(propsChangeEventName, handler);
    };
  }, [childrenProps]);

  return (
    <DLMicroContext.Provider value={childrenProps}>
      {children(childrenProps)}
    </DLMicroContext.Provider>
  );
};

function checkCurrentStatus() {
  if (!hadRegister) {
    throw new Error('Before running the function, you must execute register function');
  }
}
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
const bootstrap = async (...args: any) => {
  checkCurrentStatus();
  typeof _bootstrap == 'function' && (await _bootstrap(...args));
};
/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */

const mount = async (props?: any) => {
  checkCurrentStatus();

  const { container } = props;

  if ('render' in ReactDOM) {
    console.debug(`DL:React-micro 使用ReactDOM.render渲染子应用`);
    ReactDOM.render(
      <MicroAppContainer {...props}>
        {(_props: Record<string, any>) => {
          return <AppCmp {..._props} />;
        }}
      </MicroAppContainer>,
      getRootContainer(container),
    );
  } else {
    // @ts-ignore
    react18Root = ReactDOM.createRoot(getRootContainer(container));
    console.debug(`DL:React-micro 使用ReactDOM.createRoot渲染子应用`);
    react18Root.render(
      <MicroAppContainer {...props}>
        {(_props: Record<string, any>) => {
          return <AppCmp {..._props} />;
        }}
      </MicroAppContainer>,
    );
  }
  if (!props.isDLWidget) {
    props?.onGlobalStateChange((state) => {
      triggerCustomEvent(state || {});
    });
  } else {
    props?.offGlobalStateChange?.();
  }
  // typeof _mount == "function" && (await _mount(props));
};
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
const unmount = async (props: any) => {
  checkCurrentStatus();
  if (react18Root) {
    react18Root.unmount();
  } else {
    ReactDOM.unmountComponentAtNode(getRootContainer(props.container));
  }

  typeof _unmount == 'function' && (await _unmount(props));
};
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
const update = async (args: any) => {
  const { props } = args || {};
  triggerCustomEvent(props);
};

/**
 * 注册子应用
 * @param args
 * @param isRenderByNonDLEnvironment
 * @returns
 */
const registerDLMicro: (
  args: RegisterMicroArgs,
  isRenderByNonDLEnvironment?: boolean,
) => DLMicroLifecyle | undefined = (
  args: RegisterMicroArgs,
  isRenderByNonDLEnvironment = false,
) => {
  const lifecyle = { mount, update, unmount, bootstrap };
  if (hadRegister) {
    return lifecyle;
  }
  const { rootNodeId, App, bootstrap: bt, unmount: umt } = args || {};
  if (typeof rootNodeId !== 'string') {
    throw new Error('rootNodeId must be string');
  }
  _rootNode = rootNodeId;
  AppCmp = App;
  _bootstrap = bt;
  _unmount = umt;
  hadRegister = true;

  if (isRenderByNonDLEnvironment && !isDLRunEnvironment()) {
    ReactDOM.render(<AppCmp></AppCmp>, document.getElementById(rootNodeId));
  }

  return lifecyle;
};

const useDLMicroValue = () => {
  return useContext(DLMicroContext) || {};
};

export {
  bootstrap,
  mount,
  unmount,
  update,
  DLMicroContext,
  useDLMicroValue,
  registerDLMicro,
  isDLRunEnvironment,
};
