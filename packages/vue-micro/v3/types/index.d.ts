import { type Component, type ComputedOptions, type MethodOptions, type App } from 'vue';
import { isMicro as isDLRunEnvironment } from './util';
export declare type DLMicroLifecyleFunc = (params?: any) => Promise<any | void>;
export declare type DLMicroLifecyleItem = DLMicroLifecyleFunc | undefined;
export declare type RegisterMicroArgs = {
    rootNodeId: string;
    App: Component<any, any, any, ComputedOptions, MethodOptions>;
    bootstrap?: DLMicroLifecyleItem;
    vueAppCb?: (app: App<Element>, props?: any) => void;
    unmount?: DLMicroLifecyleItem;
};
export declare type DLMicroLifecyle = {
    mount: DLMicroLifecyleFunc;
    update: DLMicroLifecyleFunc;
    unmount: DLMicroLifecyleFunc;
    bootstrap: DLMicroLifecyleFunc;
};
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
declare const bootstrap: (...args: any) => Promise<void>;
declare const mount: (props?: any) => Promise<void>;
/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
declare const unmount: (props: any) => Promise<void>;
/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
declare const update: (args: any) => Promise<void>;
declare const registerDLMicro: (args: RegisterMicroArgs, isRenderByNonDLEnvironment?: boolean) => DLMicroLifecyle | undefined;
export { bootstrap, mount, unmount, update, registerDLMicro, isDLRunEnvironment };
