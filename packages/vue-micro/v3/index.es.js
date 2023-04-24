import { createApp, createVNode, defineComponent, provide, Fragment, reactive, onUnmounted } from "vue";
const isMicro = () => !!window.__POWERED_BY_QIANKUN__;
const polyfillCustomEvent = () => {
  try {
    new window.CustomEvent("_test_support_custom_event");
  } catch (e) {
    const CustomEvent2 = function(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: void 0
      };
      const evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent2.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent2;
  }
};
polyfillCustomEvent();
const propsChangeEventName = "propsChange" + Math.random() + Date.now();
const triggerCustomEvent = (props) => {
  const event = new CustomEvent(propsChangeEventName, {
    detail: {
      ...props
    }
  });
  document.dispatchEvent(event);
};
let AppCmp = () => createVNode(Fragment, null, null);
let _rootNode = "root";
let _bootstrap;
let _unmount;
let vueAppCb;
let vueAppInstance;
let hadRegister = false;
const getRootContainer = (container) => {
  return container ? container.querySelector("#" + _rootNode) : document.getElementById(_rootNode);
};
const MicroAppContainer = /* @__PURE__ */ defineComponent({
  props: ["extra"],
  setup(_props) {
    const {
      extra
    } = _props;
    const props = reactive(extra);
    provide("DLMicroContext", props);
    const handler = (e) => {
      const detail = e == null ? void 0 : e.detail;
      Object.keys(detail).forEach((k) => {
        props[k] = detail[k];
      });
    };
    onUnmounted(() => {
      document.removeEventListener(propsChangeEventName, handler);
    });
    document.addEventListener(propsChangeEventName, handler);
    return () => {
      return createVNode(AppCmp, props, null);
    };
  }
});
function checkCurrentStatus() {
  if (!hadRegister) {
    throw new Error("Before running the function, you must execute register function");
  }
}
const bootstrap = async (...args) => {
  checkCurrentStatus();
  typeof _bootstrap == "function" && await _bootstrap(...args);
};
const mount = async (props) => {
  var _a;
  checkCurrentStatus();
  const {
    container
  } = props;
  vueAppInstance = createApp(createVNode(MicroAppContainer, {
    "extra": props
  }, null));
  vueAppCb == null ? void 0 : vueAppCb(vueAppInstance, props);
  vueAppInstance.mount(getRootContainer(container));
  if (!props.isDLWidget) {
    props == null ? void 0 : props.onGlobalStateChange((state) => {
      triggerCustomEvent(state || {});
    });
  } else {
    (_a = props == null ? void 0 : props.offGlobalStateChange) == null ? void 0 : _a.call(props);
  }
};
const unmount = async (props) => {
  checkCurrentStatus();
  if (vueAppInstance) {
    vueAppInstance.unmount();
  }
  typeof _unmount == "function" && await _unmount(props);
};
const update = async (args) => {
  const {
    props
  } = args || {};
  triggerCustomEvent(props);
};
const registerDLMicro = (args, isRenderByNonDLEnvironment = false) => {
  const lifecyle = {
    mount,
    update,
    unmount,
    bootstrap
  };
  if (hadRegister) {
    return lifecyle;
  }
  const {
    rootNodeId,
    App,
    bootstrap: bt,
    unmount: umt,
    vueAppCb: vcb
  } = args || {};
  if (typeof rootNodeId !== "string") {
    throw new Error("rootNodeId must be string");
  }
  _rootNode = rootNodeId;
  AppCmp = App;
  _bootstrap = bt;
  _unmount = umt;
  hadRegister = true;
  vueAppCb = vcb;
  if (isRenderByNonDLEnvironment && !isMicro()) {
    const app = createApp(/* @__PURE__ */ defineComponent({
      setup() {
        provide("DLMicroContext", {});
        return () => createVNode(AppCmp, null, null);
      }
    }));
    vcb == null ? void 0 : vcb(app, {});
    app.mount(document.getElementById(rootNodeId));
  }
  return lifecyle;
};
export {
  bootstrap,
  isMicro as isDLRunEnvironment,
  mount,
  registerDLMicro,
  unmount,
  update
};
