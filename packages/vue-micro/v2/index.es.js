import { defineComponent } from "vue-demi";
import Vue from "vue";
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
let _rootNode = "root";
let _bootstrap;
let _unmount;
let vueAppCb;
let vueAppInstance;
let hadRegister = false;
const getRootContainer = (container) => {
  return container ? container.querySelector("#" + _rootNode) : document.getElementById(_rootNode);
};
defineComponent({
  render(h) {
    var _a;
    return h("div", [(_a = this == null ? void 0 : this.$slots) == null ? void 0 : _a.default, " "]);
  }
});
const MicroAppContainer = defineComponent({
  props: ["extra"],
  data() {
    return {
      DLMicroContextValue: this.extra || {}
    };
  },
  provide() {
    return {
      DLMicroContext: this.DLMicroContextValue
    };
  },
  created() {
    console.log("Micro", this);
  },
  mounted() {
    const _this = this;
    const handler = (e) => {
      const detail = e == null ? void 0 : e.detail;
      const needFetchObj = {
        ..._this.extra,
        ...detail
      };
      Object.keys(needFetchObj).forEach((key) => {
        _this.$set(_this.DLMicroContextValue, key, needFetchObj[key]);
      });
    };
    this.$once("hooks:beforeDestroy", () => {
      document.removeEventListener(propsChangeEventName, handler);
    });
    document.addEventListener(propsChangeEventName, handler);
  },
  render(h) {
    return h("dl-micro-app-cmp", {
      props: {
        ...this.DLMicroContextValue
      }
    });
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
  var _a, _b;
  checkCurrentStatus();
  const {
    container
  } = props;
  const options = (vueAppCb == null ? void 0 : vueAppCb(props)) || {};
  vueAppInstance = new Vue({
    ...options,
    render: (h) => {
      return h(MicroAppContainer, {
        "props": {
          ...{
            extra: props
          }
        }
      });
    }
  });
  (_a = vueAppInstance == null ? void 0 : vueAppInstance.$mount) == null ? void 0 : _a.call(vueAppInstance, getRootContainer(container));
  if (!props.isDLWidget) {
    props == null ? void 0 : props.onGlobalStateChange((state) => {
      triggerCustomEvent(state || {});
    });
  } else {
    (_b = props == null ? void 0 : props.offGlobalStateChange) == null ? void 0 : _b.call(props);
  }
};
const unmount = async (props) => {
  var _a;
  checkCurrentStatus();
  if (vueAppInstance) {
    (_a = vueAppInstance == null ? void 0 : vueAppInstance.$destroy) == null ? void 0 : _a.call(vueAppInstance);
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
  Vue.component("dl-micro-app-cmp", App);
  _bootstrap = bt;
  _unmount = umt;
  hadRegister = true;
  vueAppCb = vcb;
  if (isRenderByNonDLEnvironment && !isMicro()) {
    const options = (vcb == null ? void 0 : vcb({})) || {};
    new Vue({
      ...options,
      render: (h) => {
        return h(MicroAppContainer, {
          "props": {
            ...{
              extra: {}
            }
          }
        });
      }
    }).$mount(document.getElementById(rootNodeId));
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
