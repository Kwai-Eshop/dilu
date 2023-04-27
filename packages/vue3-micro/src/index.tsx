import {
  defineComponent,
  provide,
  onUnmounted,
  createApp,
  ref,
  type Component,
  type ComputedOptions,
  type MethodOptions,
  type App,
} from 'vue';
import { isMicro as isDLRunEnvironment, polyfillCustomEvent } from './util';

polyfillCustomEvent();

export type DLMicroLifecyleFunc = (params?: any) => Promise<any | void>;
export type DLMicroLifecyleItem = DLMicroLifecyleFunc | undefined;

export type RegisterMicroArgs = {
  rootNodeId: string;
  App: Component<any, any, any, ComputedOptions, MethodOptions>;
  bootstrap?: DLMicroLifecyleItem;
  vueAppCb?: (app: App<Element>, props?: any) => void;
  unmount?: DLMicroLifecyleItem;
};

export type DLMicroLifecyle = {
  mount: DLMicroLifecyleFunc;
  update: DLMicroLifecyleFunc;
  unmount: DLMicroLifecyleFunc;
  bootstrap: DLMicroLifecyleFunc;
};

const propsChangeEventName = 'propsChange' + Math.random() + Date.now();

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
const triggerCustomEvent = (props: Record<string, any>) => {
  const event = new CustomEvent(propsChangeEventName, { detail: { ...props } });
  document.dispatchEvent(event);
};

let AppCmp: any;
let _rootNode: string = 'root';
let _bootstrap: DLMicroLifecyleItem;
let _unmount: DLMicroLifecyleItem;
let vueAppCb: ((app: App<Element>, props?: any) => void) | undefined;

let vueAppInstance: App<Element>;

// 是否完成了注册，如果没有，不可以调用子应用的生命周期
let hadRegister = false;

const getRootContainer = (container: any) => {
  return container ? container.querySelector('#' + _rootNode) : document.getElementById(_rootNode);
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

const mount = async (props?: any) => {
  checkCurrentStatus();

  const { container } = props;

  vueAppInstance = createApp(
    defineComponent({
      setup() {
        const extra = ref<any>(props);
        provide('DLMicroContext', extra.value);
        const handler = (e: any) => {
          const detail = e?.detail;

          Object.keys(detail).forEach((k) => {
            extra.value[k] = detail[k];
          });
        };

        onUnmounted(() => {
          document.removeEventListener(propsChangeEventName, handler);
        });

        document.addEventListener(propsChangeEventName, handler);

        return () => {
          return <AppCmp {...extra}></AppCmp>;
        };
      },
    }),
  );
  vueAppCb?.(vueAppInstance, props);
  vueAppInstance.mount(getRootContainer(container));

  if (!props.isDLWidget) {
    props?.onGlobalStateChange((state: any) => {
      triggerCustomEvent(state || {});
    });
  } else {
    props?.offGlobalStateChange?.();
  }
};

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
const unmount = async (props: any) => {
  checkCurrentStatus();
  if (vueAppInstance) {
    vueAppInstance.unmount();
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
  const { rootNodeId, App, bootstrap: bt, unmount: umt, vueAppCb: vcb } = args || {};

  if (typeof rootNodeId !== 'string') {
    throw new Error('rootNodeId must be string');
  }

  _rootNode = rootNodeId;
  AppCmp = App;
  _bootstrap = bt;
  _unmount = umt;
  hadRegister = true;
  vueAppCb = vcb;

  if (isRenderByNonDLEnvironment && !isDLRunEnvironment()) {
    mount({});
  }
  return lifecyle;
};

export { bootstrap, mount, unmount, update, registerDLMicro, isDLRunEnvironment };
