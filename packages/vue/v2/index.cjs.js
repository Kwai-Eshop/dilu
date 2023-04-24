"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const vueDemi = require("vue-demi");
if (!window.fetch) {
  throw new Error('[@dilu/core] Here is no "fetch" on the window env, you need to polyfill it');
}
if (!window.URL) {
  throw new Error('[@dilu/core] Here is no "URL" on the window env, you need to polyfill it');
}
exports.FetchStatus = void 0;
(function(FetchStatus) {
  FetchStatus[FetchStatus["Init"] = 0] = "Init";
  FetchStatus[FetchStatus["Fetching"] = 1] = "Fetching";
  FetchStatus[FetchStatus["Fetched"] = 2] = "Fetched";
  FetchStatus[FetchStatus["Error"] = 3] = "Error";
})(exports.FetchStatus || (exports.FetchStatus = {}));
function isNotPureHost(host) {
  const isValidHostWithProtocal = /^https?:\/\//.test(host);
  const isValidHostWithoutProtocal = /^\/\//.test(host);
  return isValidHostWithProtocal || isValidHostWithoutProtocal;
}
const NetWorkError = "FetchCDNHooks NetWork Response was not OK";
const fetchPatch = async function(url, init) {
  return window.fetch(url, init).then((response) => {
    if (!response || !response.ok) {
      throw new Error(response ? `${response.status} ${response.statusText}, ${NetWorkError}` : `${NetWorkError}`);
    } else {
      return response;
    }
  }).catch((error) => {
    throw error;
  });
};
exports.Env = void 0;
(function(Env) {
  Env["Test"] = "test";
  Env["Prepare"] = "prt";
  Env["Production"] = "prod";
  Env["test"] = "test";
  Env["prt"] = "prt";
  Env["prod"] = "prod";
})(exports.Env || (exports.Env = {}));
exports.MicroType = void 0;
(function(MicroType) {
  MicroType["Route"] = "route";
  MicroType["Component"] = "component";
})(exports.MicroType || (exports.MicroType = {}));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var browserExports = {};
var browser = {
  get exports() {
    return browserExports;
  },
  set exports(v2) {
    browserExports = v2;
  }
};
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs)
    return ms;
  hasRequiredMs = 1;
  var s2 = 1e3;
  var m2 = s2 * 60;
  var h2 = m2 * 60;
  var d2 = h2 * 24;
  var w2 = d2 * 7;
  var y2 = d2 * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n2 = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n2 * y2;
      case "weeks":
      case "week":
      case "w":
        return n2 * w2;
      case "days":
      case "day":
      case "d":
        return n2 * d2;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n2 * h2;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n2 * m2;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n2 * s2;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n2;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d2) {
      return Math.round(ms2 / d2) + "d";
    }
    if (msAbs >= h2) {
      return Math.round(ms2 / h2) + "h";
    }
    if (msAbs >= m2) {
      return Math.round(ms2 / m2) + "m";
    }
    if (msAbs >= s2) {
      return Math.round(ms2 / s2) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    var msAbs = Math.abs(ms2);
    if (msAbs >= d2) {
      return plural(ms2, msAbs, d2, "day");
    }
    if (msAbs >= h2) {
      return plural(ms2, msAbs, h2, "hour");
    }
    if (msAbs >= m2) {
      return plural(ms2, msAbs, m2, "minute");
    }
    if (msAbs >= s2) {
      return plural(ms2, msAbs, s2, "second");
    }
    return ms2 + " ms";
  }
  function plural(ms2, msAbs, n2, name2) {
    var isPlural = msAbs >= n2 * 1.5;
    return Math.round(ms2 / n2) + " " + name2 + (isPlural ? "s" : "");
  }
  return ms;
}
function setup(env) {
  createDebug2.debug = createDebug2;
  createDebug2.default = createDebug2;
  createDebug2.coerce = coerce;
  createDebug2.disable = disable;
  createDebug2.enable = enable;
  createDebug2.enabled = enabled;
  createDebug2.humanize = requireMs();
  createDebug2.destroy = destroy;
  Object.keys(env).forEach((key) => {
    createDebug2[key] = env[key];
  });
  createDebug2.names = [];
  createDebug2.skips = [];
  createDebug2.formatters = {};
  function selectColor(namespace) {
    let hash = 0;
    for (let i2 = 0; i2 < namespace.length; i2++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i2);
      hash |= 0;
    }
    return createDebug2.colors[Math.abs(hash) % createDebug2.colors.length];
  }
  createDebug2.selectColor = selectColor;
  function createDebug2(namespace) {
    let prevTime;
    let enableOverride = null;
    let namespacesCache;
    let enabledCache;
    function debug2(...args) {
      if (!debug2.enabled) {
        return;
      }
      const self2 = debug2;
      const curr = Number(/* @__PURE__ */ new Date());
      const ms2 = curr - (prevTime || curr);
      self2.diff = ms2;
      self2.prev = prevTime;
      self2.curr = curr;
      prevTime = curr;
      args[0] = createDebug2.coerce(args[0]);
      if (typeof args[0] !== "string") {
        args.unshift("%O");
      }
      let index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
        if (match === "%%") {
          return "%";
        }
        index++;
        const formatter = createDebug2.formatters[format];
        if (typeof formatter === "function") {
          const val = args[index];
          match = formatter.call(self2, val);
          args.splice(index, 1);
          index--;
        }
        return match;
      });
      createDebug2.formatArgs.call(self2, args);
      const logFn = self2.log || createDebug2.log;
      logFn.apply(self2, args);
    }
    debug2.namespace = namespace;
    debug2.useColors = createDebug2.useColors();
    debug2.color = createDebug2.selectColor(namespace);
    debug2.extend = extend;
    debug2.destroy = createDebug2.destroy;
    Object.defineProperty(debug2, "enabled", {
      enumerable: true,
      configurable: false,
      get: () => {
        if (enableOverride !== null) {
          return enableOverride;
        }
        if (namespacesCache !== createDebug2.namespaces) {
          namespacesCache = createDebug2.namespaces;
          enabledCache = createDebug2.enabled(namespace);
        }
        return enabledCache;
      },
      set: (v2) => {
        enableOverride = v2;
      }
    });
    if (typeof createDebug2.init === "function") {
      createDebug2.init(debug2);
    }
    return debug2;
  }
  function extend(namespace, delimiter) {
    const newDebug = createDebug2(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
    newDebug.log = this.log;
    return newDebug;
  }
  function enable(namespaces) {
    createDebug2.save(namespaces);
    createDebug2.namespaces = namespaces;
    createDebug2.names = [];
    createDebug2.skips = [];
    let i2;
    const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
    const len = split.length;
    for (i2 = 0; i2 < len; i2++) {
      if (!split[i2]) {
        continue;
      }
      namespaces = split[i2].replace(/\*/g, ".*?");
      if (namespaces[0] === "-") {
        createDebug2.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
      } else {
        createDebug2.names.push(new RegExp("^" + namespaces + "$"));
      }
    }
  }
  function disable() {
    const namespaces = [
      ...createDebug2.names.map(toNamespace),
      ...createDebug2.skips.map(toNamespace).map((namespace) => "-" + namespace)
    ].join(",");
    createDebug2.enable("");
    return namespaces;
  }
  function enabled(name2) {
    if (name2[name2.length - 1] === "*") {
      return true;
    }
    let i2;
    let len;
    for (i2 = 0, len = createDebug2.skips.length; i2 < len; i2++) {
      if (createDebug2.skips[i2].test(name2)) {
        return false;
      }
    }
    for (i2 = 0, len = createDebug2.names.length; i2 < len; i2++) {
      if (createDebug2.names[i2].test(name2)) {
        return true;
      }
    }
    return false;
  }
  function toNamespace(regexp) {
    return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }
    return val;
  }
  function destroy() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  createDebug2.enable(createDebug2.load());
  return createDebug2;
}
var common = setup;
(function(module2, exports2) {
  exports2.formatArgs = formatArgs;
  exports2.save = save;
  exports2.load = load;
  exports2.useColors = useColors;
  exports2.storage = localstorage();
  exports2.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports2.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function useColors() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function formatArgs(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module2.exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c2 = "color: " + this.color;
    args.splice(1, 0, c2, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c2);
  }
  exports2.log = console.debug || console.log || (() => {
  });
  function save(namespaces) {
    try {
      if (namespaces) {
        exports2.storage.setItem("debug", namespaces);
      } else {
        exports2.storage.removeItem("debug");
      }
    } catch (error) {
    }
  }
  function load() {
    let r2;
    try {
      r2 = exports2.storage.getItem("debug");
    } catch (error) {
    }
    if (!r2 && typeof process !== "undefined" && "env" in process) {
      r2 = process.env.DEBUG;
    }
    return r2;
  }
  function localstorage() {
    try {
      return localStorage;
    } catch (error) {
    }
  }
  module2.exports = common(exports2);
  const { formatters } = module2.exports;
  formatters.j = function(v2) {
    try {
      return JSON.stringify(v2);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
})(browser, browserExports);
const createDebug = browserExports;
const isPromise = (obj) => {
  return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
};
const containerRandomId = `dilu__${+Date.now()}_${Math.floor(Math.random() * 1e3)}`;
const debug$9 = createDebug("DL:Core-GetMicroAppList");
const getMicroAppList = async (api, init) => {
  try {
    const _microList = await fetchPatch(api, init);
    const microList = [];
    _microList.forEach((micro) => {
      if (!!micro.entry) {
        microList.push({
          ...micro
        });
      } else {
        debug$9(`过滤没有入口的子应用：${micro.name}`);
      }
    });
    return microList;
  } catch {
    return [];
  }
};
function sanitizeActiveWhen(activeWhen) {
  let activeWhenArray = Array.isArray(activeWhen) ? activeWhen : [activeWhen];
  activeWhenArray = activeWhenArray.map((activeWhenOrPath) => typeof activeWhenOrPath === "function" ? activeWhenOrPath : pathToActiveWhen(activeWhenOrPath));
  return (location2) => activeWhenArray.some((activeWhen2) => activeWhen2(location2));
}
function pathToActiveWhen(path, exactMatch) {
  const regex = toDynamicPathValidatorRegex(path, exactMatch);
  return (location2) => {
    let origin = location2.origin;
    if (!origin) {
      origin = `${location2.protocol}//${location2.host}`;
    }
    const route = location2.href.replace(origin, "").replace(location2.search, "").split("?")[0];
    return regex.test(route);
  };
}
function escapeStrRegex(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}
function toDynamicPathValidatorRegex(path, exactMatch) {
  let lastIndex = 0, inDynamic = false, regexStr = "^";
  if (path[0] !== "/") {
    path = "/" + path;
  }
  for (let charIndex = 0; charIndex < path.length; charIndex++) {
    const char = path[charIndex];
    const startOfDynamic = !inDynamic && char === ":";
    const endOfDynamic = inDynamic && char === "/";
    if (startOfDynamic || endOfDynamic) {
      appendToRegex(charIndex);
    }
  }
  appendToRegex(path.length);
  return new RegExp(regexStr, "i");
  function appendToRegex(index) {
    const anyCharMaybeTrailingSlashRegex = "[^/]+/?";
    const commonStringSubPath = escapeStrRegex(path.slice(lastIndex, index));
    regexStr += inDynamic ? anyCharMaybeTrailingSlashRegex : commonStringSubPath;
    if (index === path.length) {
      if (inDynamic) {
        if (exactMatch) {
          regexStr += "$";
        }
      } else {
        const suffix = exactMatch ? "" : ".*";
        regexStr = // use charAt instead as we could not use es6 method endsWith
        regexStr.charAt(regexStr.length - 1) === "/" ? `${regexStr}${suffix}$` : `${regexStr}(/${suffix})?(#.*)?$`;
      }
    }
    inDynamic = !inDynamic;
    lastIndex = index;
  }
}
const filterMicrosByActiveRule = (micros, activeFilter = (_location) => true) => {
  const nameActiveMapper = /* @__PURE__ */ new Map();
  const microList = [];
  micros.forEach((micro) => {
    if (typeof micro.activeRule === "string") {
      const filterRule = [];
      let activeRuleList = micro.activeRule.split(",");
      while (activeRuleList.length) {
        const rule = activeRuleList.pop();
        if (!nameActiveMapper.get(rule)) {
          nameActiveMapper.set(rule, micro.name);
          filterRule.push(rule);
        }
      }
      microList.push({
        ...micro,
        activeRule: (location2) => {
          const activeWhen = sanitizeActiveWhen(filterRule);
          return activeWhen(location2) && activeFilter(location2);
        }
      });
    }
  });
  return microList;
};
const polyfillCustomEvent = () => {
  try {
    new window.CustomEvent("_test_support_custom_event");
  } catch (e2) {
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
exports.WidgetAppMethods = void 0;
(function(WidgetAppMethods) {
  WidgetAppMethods["mount"] = "mount";
  WidgetAppMethods["unmount"] = "unmount";
  WidgetAppMethods["getStatus"] = "getStatus";
  WidgetAppMethods["loadPromise"] = "loadPromise";
  WidgetAppMethods["bootstrapPromise"] = "bootstrapPromise";
  WidgetAppMethods["mountPromise"] = "mountPromise";
  WidgetAppMethods["unmountPromise"] = "unmountPromise";
  WidgetAppMethods["update"] = "update";
})(exports.WidgetAppMethods || (exports.WidgetAppMethods = {}));
const debug$8 = createDebug("DL:Core-createWidgetMethods");
const createWidgetMethods = (widgetName, getMicroAppInstance) => {
  let instanceMethods = {};
  Object.keys(exports.WidgetAppMethods).forEach((attribute) => {
    Object.defineProperty(instanceMethods, attribute, {
      enumerable: true,
      get() {
        let instance;
        if (typeof getMicroAppInstance == "function") {
          instance = getMicroAppInstance();
        } else {
          instance = getMicroAppInstance;
        }
        const attributeValue = instance == null ? void 0 : instance[attribute];
        if (attribute.endsWith("Promise")) {
          if (attributeValue) {
            return attributeValue;
          } else {
            debug$8("【%s】 子应用实例上没有 【%s】 属性或方法 %O", widgetName, attribute, instance);
            return Promise.resolve();
          }
        } else {
          if (attributeValue && typeof attributeValue == "function" || attribute == "update") {
            return (args) => {
              var _a;
              debug$8("【%s】 子应用的 【%s】 方法被调用", widgetName, attribute);
              let returnValue = (_a = instance == null ? void 0 : instance[attribute]) == null ? void 0 : _a.call(instance, args);
              if (isPromise(returnValue)) {
                return returnValue.then(() => {
                }).catch((e2) => {
                  debug$8("【Error】【%s】 子应用调用 【%s】 出现异常 %O", widgetName, attribute, e2);
                });
              }
              return returnValue;
            };
          } else {
            return (args) => {
              debug$8("【%s】 子应用实例上没有 【%s】 属性或方法 %O", widgetName, attribute, instance);
              return args;
            };
          }
        }
      }
    });
  });
  return instanceMethods;
};
const debug$7 = createDebug("DL:judgeActivedMicroApp");
const judgeActivedMicroApp = (registrableMicros) => {
  let actived = false;
  if (registrableMicros == null ? void 0 : registrableMicros.length) {
    actived = registrableMicros.reduce((prev, micro) => {
      let ret = false;
      if (typeof (micro == null ? void 0 : micro.activeRule) === "function") {
        ret = micro.activeRule(window.location);
      } else {
        ret = sanitizeActiveWhen(micro.activeRule)(window.location);
        debug$7("【%s】 子应用的激活规则没有被转化为function, 这里走到了兜底逻辑, 规则 【%s】", micro.name, micro.activeRule);
      }
      return prev || ret;
    }, false);
  }
  debug$7("通过judgeActivedMicroApp判断是否存在激活的应用，hasActivedMicroApp = 【%s】", actived);
  return actived;
};
exports.CollectType = void 0;
(function(CollectType) {
  CollectType["ERROR"] = "ERROR";
  CollectType["MicroError"] = "MicroError";
  CollectType["GlobalUncaughtError"] = "GlobalUncaughtError";
  CollectType["Duration"] = "Duration";
})(exports.CollectType || (exports.CollectType = {}));
const createDefaultCollect = (debug2) => (type, opts) => {
  debug2("默认的Collect处理函数: type is 【%s】, opts is %O", type, opts);
};
const debug$6 = createDebug("DL:getLifeCycle");
const defaultCollect$3 = createDefaultCollect(debug$6);
const getLifeCycle = (lifeCycleHander, collect = defaultCollect$3) => {
  let lifeCycle = {};
  ["beforeLoad", "beforeMount", "afterMount", "beforeUnmount", "afterUnmount"].forEach((lc) => {
    lifeCycle[lc] = async (app) => {
      app[lc] = Date.now();
      if (["beforeUnmount", "afterUnmount"].indexOf(lc) >= 0) {
        app["beforeLoad"] = void 0;
      }
      const eventName = "on" + lc[0].toLocaleUpperCase() + lc.substring(1);
      try {
        lifeCycleHander(eventName, app);
      } catch (e2) {
        collect == null ? void 0 : collect(exports.CollectType.ERROR, e2);
      }
      if (lc == "afterMount") {
        try {
          const duration = {
            load: app["beforeLoad"] ? app["beforeMount"] - app["beforeLoad"] : 0,
            mount: app["afterMount"] - app["beforeMount"],
            total: app["afterMount"] - (app["beforeLoad"] ?? app["beforeMount"])
          };
          collect == null ? void 0 : collect(exports.CollectType.Duration, {
            ...app,
            duration
          });
          debug$6("【%s】 子应用生命周期耗时: %O, 子应用信息：%O", app.name, duration, app);
        } catch (e2) {
          debug$6("【Error】【%s】 子应用生命周期耗时计算出现异常, 子应用信息：%O", app.name, app);
        }
      }
    };
  });
  return lifeCycle;
};
const createDowngradContainer = (containerId) => {
  let downgradContainer = findDowngradContainer(containerId);
  if (downgradContainer) {
    return downgradContainer;
  }
  let containerEle;
  if (containerId && (containerEle = document.getElementById(containerId))) {
    downgradContainer = document.createElement("div");
    downgradContainer.setAttribute("data-dl-downgrad-container", containerEle.id);
    const parentNode = containerEle.parentNode || document.body;
    return parentNode.insertBefore(downgradContainer, containerEle);
  }
};
const findDowngradContainer = (containerId) => {
  return document.querySelector(`div[data-dl-downgrad-container='${containerId}']`);
};
const containerIsExists = (containerId) => {
  if (containerId && document.getElementById(containerId)) {
    return true;
  }
  return false;
};
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self2 = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self2, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
function noop() {
}
var noop_1 = noop;
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter2) {
  if (typeof Symbol !== "undefined" && iter2[Symbol.iterator] != null || iter2["@@iterator"] != null)
    return Array.from(iter2);
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof$1(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof$1(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof$1(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof$1(key) === "symbol" ? key : String(key);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys$1(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2 ? ownKeys$1(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var regeneratorRuntimeExports = {};
var regeneratorRuntime$1 = {
  get exports() {
    return regeneratorRuntimeExports;
  },
  set exports(v2) {
    regeneratorRuntimeExports = v2;
  }
};
var _typeofExports = {};
var _typeof = {
  get exports() {
    return _typeofExports;
  },
  set exports(v2) {
    _typeofExports = v2;
  }
};
(function(module2) {
  function _typeof2(obj) {
    "@babel/helpers - typeof";
    return module2.exports = _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
      return typeof obj2;
    } : function(obj2) {
      return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _typeof2(obj);
  }
  module2.exports = _typeof2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(_typeof);
(function(module2) {
  var _typeof2 = _typeofExports["default"];
  function _regeneratorRuntime() {
    module2.exports = _regeneratorRuntime = function _regeneratorRuntime2() {
      return exports2;
    }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
    var exports2 = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty2 = Object.defineProperty || function(obj, key, desc) {
      obj[key] = desc.value;
    }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function define2(obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self2, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
      return defineProperty2(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self2, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports2.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {
    }
    function GeneratorFunction() {
    }
    function GeneratorFunctionPrototype() {
    }
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
      return this;
    });
    var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function(method) {
        define(prototype, method, function(arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg, value = result.value;
          return value && "object" == _typeof2(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
            invoke("next", value2, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function(unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function(error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty2(this, "_invoke", {
        value: function value(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function(resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self2, context) {
      var state = "suspendedStart";
      return function(method, arg) {
        if ("executing" === state)
          throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method)
            throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg; ; ) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel)
                continue;
              return delegateResult;
            }
          }
          if ("next" === context.method)
            context.sent = context._sent = context.arg;
          else if ("throw" === context.method) {
            if ("suspendedStart" === state)
              throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else
            "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self2, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
              continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method, method = delegate.iterator[methodName];
      if (void 0 === method)
        return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type)
        return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod)
          return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next)
          return iterable;
        if (!isNaN(iterable.length)) {
          var i2 = -1, next = function next2() {
            for (; ++i2 < iterable.length; )
              if (hasOwn.call(iterable, i2))
                return next2.value = iterable[i2], next2.done = false, next2;
            return next2.value = void 0, next2.done = true, next2;
          };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: void 0,
        done: true
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty2(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: true
    }), defineProperty2(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: true
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports2.isGeneratorFunction = function(genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports2.mark = function(genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports2.awrap = function(arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
      return this;
    }), exports2.AsyncIterator = AsyncIterator, exports2.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter2 = new AsyncIterator(wrap(innerFn, outerFn, self2, tryLocsList), PromiseImpl);
      return exports2.isGeneratorFunction(outerFn) ? iter2 : iter2.next().then(function(result) {
        return result.done ? result.value : iter2.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
      return this;
    }), define(Gp, "toString", function() {
      return "[object Generator]";
    }), exports2.keys = function(val) {
      var object = Object(val), keys2 = [];
      for (var key in object)
        keys2.push(key);
      return keys2.reverse(), function next() {
        for (; keys2.length; ) {
          var key2 = keys2.pop();
          if (key2 in object)
            return next.value = key2, next.done = false, next;
        }
        return next.done = true, next;
      };
    }, exports2.values = values, Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
          for (var name2 in this)
            "t" === name2.charAt(0) && hasOwn.call(this, name2) && !isNaN(+name2.slice(1)) && (this[name2] = void 0);
      },
      stop: function stop() {
        this.done = true;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type)
          throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done)
          throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
        }
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2], record = entry.completion;
          if ("root" === entry.tryLoc)
            return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc)
                return handle(entry.catchLoc, true);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc)
                return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type)
          throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.finallyLoc === finallyLoc)
            return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i2 = this.tryEntries.length - 1; i2 >= 0; --i2) {
          var entry = this.tryEntries[i2];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName,
          nextLoc
        }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
      }
    }, exports2;
  }
  module2.exports = _regeneratorRuntime, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
})(regeneratorRuntime$1);
var runtime = regeneratorRuntimeExports();
var regenerator = runtime;
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
var t = Object.freeze({ __proto__: null, get start() {
  return xt;
}, get ensureJQuerySupport() {
  return ft;
}, get setBootstrapMaxTime() {
  return F;
}, get setMountMaxTime() {
  return J;
}, get setUnmountMaxTime() {
  return H;
}, get setUnloadMaxTime() {
  return Q;
}, get registerApplication() {
  return Ot;
}, get unregisterApplication() {
  return Tt;
}, get getMountedApps() {
  return Et;
}, get getAppStatus() {
  return Pt;
}, get unloadApplication() {
  return At;
}, get checkActivityFunctions() {
  return bt;
}, get getAppNames() {
  return yt;
}, get pathToActiveWhen() {
  return _t;
}, get navigateToUrl() {
  return nt;
}, get triggerAppChange() {
  return Mt;
}, get addErrorHandler() {
  return a;
}, get removeErrorHandler() {
  return c;
}, get mountRootParcel() {
  return C;
}, get NOT_LOADED() {
  return l;
}, get LOADING_SOURCE_CODE() {
  return p;
}, get NOT_BOOTSTRAPPED() {
  return h;
}, get BOOTSTRAPPING() {
  return m;
}, get NOT_MOUNTED() {
  return v;
}, get MOUNTING() {
  return d;
}, get UPDATING() {
  return g;
}, get LOAD_ERROR() {
  return y;
}, get MOUNTED() {
  return w;
}, get UNMOUNTING() {
  return E;
}, get SKIP_BECAUSE_BROKEN() {
  return P;
} });
function n(t2) {
  return (n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
    return typeof t3;
  } : function(t3) {
    return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
  })(t2);
}
function e(t2, n2, e2) {
  return n2 in t2 ? Object.defineProperty(t2, n2, { value: e2, enumerable: true, configurable: true, writable: true }) : t2[n2] = e2, t2;
}
var r = ("undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).CustomEvent, o = function() {
  try {
    var t2 = new r("cat", { detail: { foo: "bar" } });
    return "cat" === t2.type && "bar" === t2.detail.foo;
  } catch (t3) {
  }
  return false;
}() ? r : "undefined" != typeof document && "function" == typeof document.createEvent ? function(t2, n2) {
  var e2 = document.createEvent("CustomEvent");
  return n2 ? e2.initCustomEvent(t2, n2.bubbles, n2.cancelable, n2.detail) : e2.initCustomEvent(t2, false, false, void 0), e2;
} : function(t2, n2) {
  var e2 = document.createEventObject();
  return e2.type = t2, n2 ? (e2.bubbles = Boolean(n2.bubbles), e2.cancelable = Boolean(n2.cancelable), e2.detail = n2.detail) : (e2.bubbles = false, e2.cancelable = false, e2.detail = void 0), e2;
}, i = [];
function u(t2, n2, e2) {
  var r2 = f(t2, n2, e2);
  i.length ? i.forEach(function(t3) {
    return t3(r2);
  }) : setTimeout(function() {
    throw r2;
  });
}
function a(t2) {
  if ("function" != typeof t2)
    throw Error(s(28, false));
  i.push(t2);
}
function c(t2) {
  if ("function" != typeof t2)
    throw Error(s(29, false));
  var n2 = false;
  return i = i.filter(function(e2) {
    var r2 = e2 === t2;
    return n2 = n2 || r2, !r2;
  }), n2;
}
function s(t2, n2) {
  for (var e2 = arguments.length, r2 = new Array(e2 > 2 ? e2 - 2 : 0), o2 = 2; o2 < e2; o2++)
    r2[o2 - 2] = arguments[o2];
  return "single-spa minified message #".concat(t2, ": ").concat(n2 ? n2 + " " : "", "See https://single-spa.js.org/error/?code=").concat(t2).concat(r2.length ? "&arg=".concat(r2.join("&arg=")) : "");
}
function f(t2, n2, e2) {
  var r2, o2 = "".concat(N(n2), " '").concat(T(n2), "' died in status ").concat(n2.status, ": ");
  if (t2 instanceof Error) {
    try {
      t2.message = o2 + t2.message;
    } catch (t3) {
    }
    r2 = t2;
  } else {
    console.warn(s(30, false, n2.status, T(n2)));
    try {
      r2 = Error(o2 + JSON.stringify(t2));
    } catch (n3) {
      r2 = t2;
    }
  }
  return r2.appOrParcelName = T(n2), n2.status = e2, r2;
}
var l = "NOT_LOADED", p = "LOADING_SOURCE_CODE", h = "NOT_BOOTSTRAPPED", m = "BOOTSTRAPPING", v = "NOT_MOUNTED", d = "MOUNTING", w = "MOUNTED", g = "UPDATING", E = "UNMOUNTING", y = "LOAD_ERROR", P = "SKIP_BECAUSE_BROKEN";
function O(t2) {
  return t2.status === w;
}
function b(t2) {
  try {
    return t2.activeWhen(window.location);
  } catch (n2) {
    return u(n2, t2, P), false;
  }
}
function T(t2) {
  return t2.name;
}
function A(t2) {
  return Boolean(t2.unmountThisParcel);
}
function N(t2) {
  return A(t2) ? "parcel" : "application";
}
function S() {
  for (var t2 = arguments.length - 1; t2 > 0; t2--)
    for (var n2 in arguments[t2])
      "__proto__" !== n2 && (arguments[t2 - 1][n2] = arguments[t2][n2]);
  return arguments[0];
}
function _(t2, n2) {
  for (var e2 = 0; e2 < t2.length; e2++)
    if (n2(t2[e2]))
      return t2[e2];
  return null;
}
function D(t2) {
  return t2 && ("function" == typeof t2 || (n2 = t2, Array.isArray(n2) && !_(n2, function(t3) {
    return "function" != typeof t3;
  })));
  var n2;
}
function U(t2, n2) {
  var e2 = t2[n2] || [];
  0 === (e2 = Array.isArray(e2) ? e2 : [e2]).length && (e2 = [function() {
    return Promise.resolve();
  }]);
  var r2 = N(t2), o2 = T(t2);
  return function(t3) {
    return e2.reduce(function(e3, i2, u2) {
      return e3.then(function() {
        var e4 = i2(t3);
        return j(e4) ? e4 : Promise.reject(s(15, false, r2, o2, n2, u2));
      });
    }, Promise.resolve());
  };
}
function j(t2) {
  return t2 && "function" == typeof t2.then && "function" == typeof t2.catch;
}
function M(t2, n2) {
  return Promise.resolve().then(function() {
    return t2.status !== h ? t2 : (t2.status = m, t2.bootstrap ? V(t2, "bootstrap").then(e2).catch(function(e3) {
      if (n2)
        throw f(e3, t2, P);
      return u(e3, t2, P), t2;
    }) : Promise.resolve().then(e2));
  });
  function e2() {
    return t2.status = v, t2;
  }
}
function L(t2, n2) {
  return Promise.resolve().then(function() {
    if (t2.status !== w)
      return t2;
    t2.status = E;
    var e2 = Object.keys(t2.parcels).map(function(n3) {
      return t2.parcels[n3].unmountThisParcel();
    });
    return Promise.all(e2).then(r2, function(e3) {
      return r2().then(function() {
        var r3 = Error(e3.message);
        if (n2)
          throw f(r3, t2, P);
        u(r3, t2, P);
      });
    }).then(function() {
      return t2;
    });
    function r2() {
      return V(t2, "unmount").then(function() {
        t2.status = v;
      }).catch(function(e3) {
        if (n2)
          throw f(e3, t2, P);
        u(e3, t2, P);
      });
    }
  });
}
var R = false, I = false;
function x(t2, n2) {
  return Promise.resolve().then(function() {
    return t2.status !== v ? t2 : (R || (window.dispatchEvent(new o("single-spa:before-first-mount")), R = true), V(t2, "mount").then(function() {
      return t2.status = w, I || (window.dispatchEvent(new o("single-spa:first-mount")), I = true), t2;
    }).catch(function(e2) {
      return t2.status = w, L(t2, true).then(r2, r2);
      function r2() {
        if (n2)
          throw f(e2, t2, P);
        return u(e2, t2, P), t2;
      }
    }));
  });
}
var B = 0, G = { parcels: {} };
function C() {
  return W.apply(G, arguments);
}
function W(t2, e2) {
  var r2 = this;
  if (!t2 || "object" !== n(t2) && "function" != typeof t2)
    throw Error(s(2, false));
  if (t2.name && "string" != typeof t2.name)
    throw Error(s(3, false, n(t2.name)));
  if ("object" !== n(e2))
    throw Error(s(4, false, name, n(e2)));
  if (!e2.domElement)
    throw Error(s(5, false, name));
  var o2, i2 = B++, u2 = "function" == typeof t2, a2 = u2 ? t2 : function() {
    return Promise.resolve(t2);
  }, c2 = { id: i2, parcels: {}, status: u2 ? p : h, customProps: e2, parentName: T(r2), unmountThisParcel: function() {
    return y2.then(function() {
      if (c2.status !== w)
        throw Error(s(6, false, name, c2.status));
      return L(c2, true);
    }).then(function(t3) {
      return c2.parentName && delete r2.parcels[c2.id], t3;
    }).then(function(t3) {
      return m2(t3), t3;
    }).catch(function(t3) {
      throw c2.status = P, d2(t3), t3;
    });
  } };
  r2.parcels[i2] = c2;
  var l2 = a2();
  if (!l2 || "function" != typeof l2.then)
    throw Error(s(7, false));
  var m2, d2, E2 = (l2 = l2.then(function(t3) {
    if (!t3)
      throw Error(s(8, false));
    var n2 = t3.name || "parcel-".concat(i2);
    if (Object.prototype.hasOwnProperty.call(t3, "bootstrap") && !D(t3.bootstrap))
      throw Error(s(9, false, n2));
    if (!D(t3.mount))
      throw Error(s(10, false, n2));
    if (!D(t3.unmount))
      throw Error(s(11, false, n2));
    if (t3.update && !D(t3.update))
      throw Error(s(12, false, n2));
    var e3 = U(t3, "bootstrap"), r3 = U(t3, "mount"), u3 = U(t3, "unmount");
    c2.status = h, c2.name = n2, c2.bootstrap = e3, c2.mount = r3, c2.unmount = u3, c2.timeouts = q(t3.timeouts), t3.update && (c2.update = U(t3, "update"), o2.update = function(t4) {
      return c2.customProps = t4, $(function(t5) {
        return Promise.resolve().then(function() {
          if (t5.status !== w)
            throw Error(s(32, false, T(t5)));
          return t5.status = g, V(t5, "update").then(function() {
            return t5.status = w, t5;
          }).catch(function(n3) {
            throw f(n3, t5, P);
          });
        });
      }(c2));
    });
  })).then(function() {
    return M(c2, true);
  }), y2 = E2.then(function() {
    return x(c2, true);
  }), O2 = new Promise(function(t3, n2) {
    m2 = t3, d2 = n2;
  });
  return o2 = { mount: function() {
    return $(Promise.resolve().then(function() {
      if (c2.status !== v)
        throw Error(s(13, false, name, c2.status));
      return r2.parcels[i2] = c2, x(c2);
    }));
  }, unmount: function() {
    return $(c2.unmountThisParcel());
  }, getStatus: function() {
    return c2.status;
  }, loadPromise: $(l2), bootstrapPromise: $(E2), mountPromise: $(y2), unmountPromise: $(O2) };
}
function $(t2) {
  return t2.then(function() {
    return null;
  });
}
function k(e2) {
  var r2 = T(e2), o2 = "function" == typeof e2.customProps ? e2.customProps(r2, window.location) : e2.customProps;
  ("object" !== n(o2) || null === o2 || Array.isArray(o2)) && (o2 = {}, console.warn(s(40, false), r2, o2));
  var i2 = S({}, o2, { name: r2, mountParcel: W.bind(e2), singleSpa: t });
  return A(e2) && (i2.unmountSelf = e2.unmountThisParcel), i2;
}
var K = { bootstrap: { millis: 4e3, dieOnTimeout: false, warningMillis: 1e3 }, mount: { millis: 3e3, dieOnTimeout: false, warningMillis: 1e3 }, unmount: { millis: 3e3, dieOnTimeout: false, warningMillis: 1e3 }, unload: { millis: 3e3, dieOnTimeout: false, warningMillis: 1e3 }, update: { millis: 3e3, dieOnTimeout: false, warningMillis: 1e3 } };
function F(t2, n2, e2) {
  if ("number" != typeof t2 || t2 <= 0)
    throw Error(s(16, false));
  K.bootstrap = { millis: t2, dieOnTimeout: n2, warningMillis: e2 || 1e3 };
}
function J(t2, n2, e2) {
  if ("number" != typeof t2 || t2 <= 0)
    throw Error(s(17, false));
  K.mount = { millis: t2, dieOnTimeout: n2, warningMillis: e2 || 1e3 };
}
function H(t2, n2, e2) {
  if ("number" != typeof t2 || t2 <= 0)
    throw Error(s(18, false));
  K.unmount = { millis: t2, dieOnTimeout: n2, warningMillis: e2 || 1e3 };
}
function Q(t2, n2, e2) {
  if ("number" != typeof t2 || t2 <= 0)
    throw Error(s(19, false));
  K.unload = { millis: t2, dieOnTimeout: n2, warningMillis: e2 || 1e3 };
}
function V(t2, n2) {
  var e2 = t2.timeouts[n2], r2 = e2.warningMillis, o2 = N(t2);
  return new Promise(function(i2, u2) {
    var a2 = false, c2 = false;
    t2[n2](k(t2)).then(function(t3) {
      a2 = true, i2(t3);
    }).catch(function(t3) {
      a2 = true, u2(t3);
    }), setTimeout(function() {
      return l2(1);
    }, r2), setTimeout(function() {
      return l2(true);
    }, e2.millis);
    var f2 = s(31, false, n2, o2, T(t2), e2.millis);
    function l2(t3) {
      if (!a2) {
        if (true === t3)
          c2 = true, e2.dieOnTimeout ? u2(Error(f2)) : console.error(f2);
        else if (!c2) {
          var n3 = t3, o3 = n3 * r2;
          console.warn(f2), o3 + r2 < e2.millis && setTimeout(function() {
            return l2(n3 + 1);
          }, r2);
        }
      }
    }
  });
}
function q(t2) {
  var n2 = {};
  for (var e2 in K)
    n2[e2] = S({}, K[e2], t2 && t2[e2] || {});
  return n2;
}
function z(t2) {
  return Promise.resolve().then(function() {
    return t2.loadPromise ? t2.loadPromise : t2.status !== l && t2.status !== y ? t2 : (t2.status = p, t2.loadPromise = Promise.resolve().then(function() {
      var o2 = t2.loadApp(k(t2));
      if (!j(o2))
        throw r2 = true, Error(s(33, false, T(t2)));
      return o2.then(function(r3) {
        var o3;
        t2.loadErrorTime = null, "object" !== n(e2 = r3) && (o3 = 34), Object.prototype.hasOwnProperty.call(e2, "bootstrap") && !D(e2.bootstrap) && (o3 = 35), D(e2.mount) || (o3 = 36), D(e2.unmount) || (o3 = 37);
        var i2 = N(e2);
        if (o3) {
          var a2;
          try {
            a2 = JSON.stringify(e2);
          } catch (t3) {
          }
          return console.error(s(o3, false, i2, T(t2), a2), e2), u(void 0, t2, P), t2;
        }
        return e2.devtools && e2.devtools.overlays && (t2.devtools.overlays = S({}, t2.devtools.overlays, e2.devtools.overlays)), t2.status = h, t2.bootstrap = U(e2, "bootstrap"), t2.mount = U(e2, "mount"), t2.unmount = U(e2, "unmount"), t2.unload = U(e2, "unload"), t2.timeouts = q(e2.timeouts), delete t2.loadPromise, t2;
      });
    }).catch(function(n2) {
      var e3;
      return delete t2.loadPromise, r2 ? e3 = P : (e3 = y, t2.loadErrorTime = (/* @__PURE__ */ new Date()).getTime()), u(n2, t2, e3), t2;
    }));
    var e2, r2;
  });
}
var X, Y = "undefined" != typeof window, Z = { hashchange: [], popstate: [] }, tt = ["hashchange", "popstate"];
function nt(t2) {
  var n2;
  if ("string" == typeof t2)
    n2 = t2;
  else if (this && this.href)
    n2 = this.href;
  else {
    if (!(t2 && t2.currentTarget && t2.currentTarget.href && t2.preventDefault))
      throw Error(s(14, false));
    n2 = t2.currentTarget.href, t2.preventDefault();
  }
  var e2 = ct(window.location.href), r2 = ct(n2);
  0 === n2.indexOf("#") ? window.location.hash = r2.hash : e2.host !== r2.host && r2.host ? window.location.href = n2 : r2.pathname === e2.pathname && r2.search === e2.search ? window.location.hash = r2.hash : window.history.pushState(null, null, n2);
}
function et(t2) {
  var n2 = this;
  if (t2) {
    var e2 = t2[0].type;
    tt.indexOf(e2) >= 0 && Z[e2].forEach(function(e3) {
      try {
        e3.apply(n2, t2);
      } catch (t3) {
        setTimeout(function() {
          throw t3;
        });
      }
    });
  }
}
function rt() {
  Lt([], arguments);
}
function ot(t2, n2) {
  return function() {
    var e2 = window.location.href, r2 = t2.apply(this, arguments), o2 = window.location.href;
    return X && e2 === o2 || (Bt() ? window.dispatchEvent(it(window.history.state, n2)) : Lt([])), r2;
  };
}
function it(t2, n2) {
  var e2;
  try {
    e2 = new PopStateEvent("popstate", { state: t2 });
  } catch (n3) {
    (e2 = document.createEvent("PopStateEvent")).initPopStateEvent("popstate", false, false, t2);
  }
  return e2.singleSpa = true, e2.singleSpaTrigger = n2, e2;
}
if (Y) {
  window.addEventListener("hashchange", rt), window.addEventListener("popstate", rt);
  var ut = window.addEventListener, at = window.removeEventListener;
  window.addEventListener = function(t2, n2) {
    if (!("function" == typeof n2 && tt.indexOf(t2) >= 0) || _(Z[t2], function(t3) {
      return t3 === n2;
    }))
      return ut.apply(this, arguments);
    Z[t2].push(n2);
  }, window.removeEventListener = function(t2, n2) {
    if (!("function" == typeof n2 && tt.indexOf(t2) >= 0))
      return at.apply(this, arguments);
    Z[t2] = Z[t2].filter(function(t3) {
      return t3 !== n2;
    });
  }, window.history.pushState = ot(window.history.pushState, "pushState"), window.history.replaceState = ot(window.history.replaceState, "replaceState"), window.singleSpaNavigate ? console.warn(s(41, false)) : window.singleSpaNavigate = nt;
}
function ct(t2) {
  var n2 = document.createElement("a");
  return n2.href = t2, n2;
}
var st = false;
function ft() {
  var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.jQuery;
  if (t2 || window.$ && window.$.fn && window.$.fn.jquery && (t2 = window.$), t2 && !st) {
    var n2 = t2.fn.on, e2 = t2.fn.off;
    t2.fn.on = function(t3, e3) {
      return lt.call(this, n2, window.addEventListener, t3, e3, arguments);
    }, t2.fn.off = function(t3, n3) {
      return lt.call(this, e2, window.removeEventListener, t3, n3, arguments);
    }, st = true;
  }
}
function lt(t2, n2, e2, r2, o2) {
  return "string" != typeof e2 ? t2.apply(this, o2) : (e2.split(/\s+/).forEach(function(t3) {
    tt.indexOf(t3) >= 0 && (n2(t3, r2), e2 = e2.replace(t3, ""));
  }), "" === e2.trim() ? this : t2.apply(this, o2));
}
var pt = {};
function ht(t2) {
  return Promise.resolve().then(function() {
    var n2 = pt[T(t2)];
    if (!n2)
      return t2;
    if (t2.status === l)
      return mt(t2, n2), t2;
    if ("UNLOADING" === t2.status)
      return n2.promise.then(function() {
        return t2;
      });
    if (t2.status !== v && t2.status !== y)
      return t2;
    var e2 = t2.status === y ? Promise.resolve() : V(t2, "unload");
    return t2.status = "UNLOADING", e2.then(function() {
      return mt(t2, n2), t2;
    }).catch(function(e3) {
      return function(t3, n3, e4) {
        delete pt[T(t3)], delete t3.bootstrap, delete t3.mount, delete t3.unmount, delete t3.unload, u(e4, t3, P), n3.reject(e4);
      }(t2, n2, e3), t2;
    });
  });
}
function mt(t2, n2) {
  delete pt[T(t2)], delete t2.bootstrap, delete t2.mount, delete t2.unmount, delete t2.unload, t2.status = l, n2.resolve();
}
function vt(t2, n2, e2, r2) {
  pt[T(t2)] = { app: t2, resolve: e2, reject: r2 }, Object.defineProperty(pt[T(t2)], "promise", { get: n2 });
}
function dt(t2) {
  return pt[t2];
}
var wt = [];
function gt() {
  var t2 = [], n2 = [], e2 = [], r2 = [], o2 = (/* @__PURE__ */ new Date()).getTime();
  return wt.forEach(function(i2) {
    var u2 = i2.status !== P && b(i2);
    switch (i2.status) {
      case y:
        u2 && o2 - i2.loadErrorTime >= 200 && e2.push(i2);
        break;
      case l:
      case p:
        u2 && e2.push(i2);
        break;
      case h:
      case v:
        !u2 && dt(T(i2)) ? t2.push(i2) : u2 && r2.push(i2);
        break;
      case w:
        u2 || n2.push(i2);
    }
  }), { appsToUnload: t2, appsToUnmount: n2, appsToLoad: e2, appsToMount: r2 };
}
function Et() {
  return wt.filter(O).map(T);
}
function yt() {
  return wt.map(T);
}
function Pt(t2) {
  var n2 = _(wt, function(n3) {
    return T(n3) === t2;
  });
  return n2 ? n2.status : null;
}
function Ot(t2, e2, r2, o2) {
  var i2 = function(t3, e3, r3, o3) {
    var i3, u2 = { name: null, loadApp: null, activeWhen: null, customProps: null };
    return "object" === n(t3) ? (function(t4) {
      if (Array.isArray(t4) || null === t4)
        throw Error(s(39, false));
      var e4 = ["name", "app", "activeWhen", "customProps"], r4 = Object.keys(t4).reduce(function(t5, n2) {
        return e4.indexOf(n2) >= 0 ? t5 : t5.concat(n2);
      }, []);
      if (0 !== r4.length)
        throw Error(s(38, false, e4.join(", "), r4.join(", ")));
      if ("string" != typeof t4.name || 0 === t4.name.length)
        throw Error(s(20, false));
      if ("object" !== n(t4.app) && "function" != typeof t4.app)
        throw Error(s(20, false));
      var o4 = function(t5) {
        return "string" == typeof t5 || "function" == typeof t5;
      };
      if (!(o4(t4.activeWhen) || Array.isArray(t4.activeWhen) && t4.activeWhen.every(o4)))
        throw Error(s(24, false));
      if (!St(t4.customProps))
        throw Error(s(22, false));
    }(t3), u2.name = t3.name, u2.loadApp = t3.app, u2.activeWhen = t3.activeWhen, u2.customProps = t3.customProps) : (function(t4, n2, e4, r4) {
      if ("string" != typeof t4 || 0 === t4.length)
        throw Error(s(20, false));
      if (!n2)
        throw Error(s(23, false));
      if ("function" != typeof e4)
        throw Error(s(24, false));
      if (!St(r4))
        throw Error(s(22, false));
    }(t3, e3, r3, o3), u2.name = t3, u2.loadApp = e3, u2.activeWhen = r3, u2.customProps = o3), u2.loadApp = "function" != typeof (i3 = u2.loadApp) ? function() {
      return Promise.resolve(i3);
    } : i3, u2.customProps = function(t4) {
      return t4 || {};
    }(u2.customProps), u2.activeWhen = function(t4) {
      var n2 = Array.isArray(t4) ? t4 : [t4];
      return n2 = n2.map(function(t5) {
        return "function" == typeof t5 ? t5 : _t(t5);
      }), function(t5) {
        return n2.some(function(n3) {
          return n3(t5);
        });
      };
    }(u2.activeWhen), u2;
  }(t2, e2, r2, o2);
  if (-1 !== yt().indexOf(i2.name))
    throw Error(s(21, false, i2.name));
  wt.push(S({ loadErrorTime: null, status: l, parcels: {}, devtools: { overlays: { options: {}, selectors: [] } } }, i2)), Y && (ft(), Lt());
}
function bt() {
  var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : window.location;
  return wt.filter(function(n2) {
    return n2.activeWhen(t2);
  }).map(T);
}
function Tt(t2) {
  if (0 === wt.filter(function(n2) {
    return T(n2) === t2;
  }).length)
    throw Error(s(25, false, t2));
  return At(t2).then(function() {
    var n2 = wt.map(T).indexOf(t2);
    wt.splice(n2, 1);
  });
}
function At(t2) {
  var n2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : { waitForUnmount: false };
  if ("string" != typeof t2)
    throw Error(s(26, false));
  var e2 = _(wt, function(n3) {
    return T(n3) === t2;
  });
  if (!e2)
    throw Error(s(27, false, t2));
  var r2, o2 = dt(T(e2));
  if (n2 && n2.waitForUnmount) {
    if (o2)
      return o2.promise;
    var i2 = new Promise(function(t3, n3) {
      vt(e2, function() {
        return i2;
      }, t3, n3);
    });
    return i2;
  }
  return o2 ? (r2 = o2.promise, Nt(e2, o2.resolve, o2.reject)) : r2 = new Promise(function(t3, n3) {
    vt(e2, function() {
      return r2;
    }, t3, n3), Nt(e2, t3, n3);
  }), r2;
}
function Nt(t2, n2, e2) {
  L(t2).then(ht).then(function() {
    n2(), setTimeout(function() {
      Lt();
    });
  }).catch(e2);
}
function St(t2) {
  return !t2 || "function" == typeof t2 || "object" === n(t2) && null !== t2 && !Array.isArray(t2);
}
function _t(t2, n2) {
  var e2 = function(t3, n3) {
    var e3 = 0, r2 = false, o2 = "^";
    "/" !== t3[0] && (t3 = "/" + t3);
    for (var i2 = 0; i2 < t3.length; i2++) {
      var u2 = t3[i2];
      (!r2 && ":" === u2 || r2 && "/" === u2) && a2(i2);
    }
    return a2(t3.length), new RegExp(o2, "i");
    function a2(i3) {
      var u3 = t3.slice(e3, i3).replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
      if (o2 += r2 ? "[^/]+/?" : u3, i3 === t3.length)
        if (r2)
          n3 && (o2 += "$");
        else {
          var a3 = n3 ? "" : ".*";
          o2 = "/" === o2.charAt(o2.length - 1) ? "".concat(o2).concat(a3, "$") : "".concat(o2, "(/").concat(a3, ")?(#.*)?$");
        }
      r2 = !r2, e3 = i3;
    }
  }(t2, n2);
  return function(t3) {
    var n3 = t3.origin;
    n3 || (n3 = "".concat(t3.protocol, "//").concat(t3.host));
    var r2 = t3.href.replace(n3, "").replace(t3.search, "").split("?")[0];
    return e2.test(r2);
  };
}
var Dt = false, Ut = [], jt = Y && window.location.href;
function Mt() {
  return Lt();
}
function Lt() {
  var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n2 = arguments.length > 1 ? arguments[1] : void 0;
  if (Dt)
    return new Promise(function(t3, e2) {
      Ut.push({ resolve: t3, reject: e2, eventArguments: n2 });
    });
  var r2, i2 = gt(), u2 = i2.appsToUnload, a2 = i2.appsToUnmount, c2 = i2.appsToLoad, s2 = i2.appsToMount, f2 = false, p2 = jt, h2 = jt = window.location.href;
  return Bt() ? (Dt = true, r2 = u2.concat(c2, a2, s2), g2()) : (r2 = c2, d2());
  function m2() {
    f2 = true;
  }
  function d2() {
    return Promise.resolve().then(function() {
      var t3 = c2.map(z);
      return Promise.all(t3).then(y2).then(function() {
        return [];
      }).catch(function(t4) {
        throw y2(), t4;
      });
    });
  }
  function g2() {
    return Promise.resolve().then(function() {
      if (window.dispatchEvent(new o(0 === r2.length ? "single-spa:before-no-app-change" : "single-spa:before-app-change", O2(true))), window.dispatchEvent(new o("single-spa:before-routing-event", O2(true, { cancelNavigation: m2 }))), f2)
        return window.dispatchEvent(new o("single-spa:before-mount-routing-event", O2(true))), E2(), void nt(p2);
      var n3 = u2.map(ht), e2 = a2.map(L).map(function(t3) {
        return t3.then(ht);
      }).concat(n3), i3 = Promise.all(e2);
      i3.then(function() {
        window.dispatchEvent(new o("single-spa:before-mount-routing-event", O2(true)));
      });
      var l2 = c2.map(function(t3) {
        return z(t3).then(function(t4) {
          return Rt(t4, i3);
        });
      }), h3 = s2.filter(function(t3) {
        return c2.indexOf(t3) < 0;
      }).map(function(t3) {
        return Rt(t3, i3);
      });
      return i3.catch(function(t3) {
        throw y2(), t3;
      }).then(function() {
        return y2(), Promise.all(l2.concat(h3)).catch(function(n4) {
          throw t2.forEach(function(t3) {
            return t3.reject(n4);
          }), n4;
        }).then(E2);
      });
    });
  }
  function E2() {
    var n3 = Et();
    t2.forEach(function(t3) {
      return t3.resolve(n3);
    });
    try {
      var e2 = 0 === r2.length ? "single-spa:no-app-change" : "single-spa:app-change";
      window.dispatchEvent(new o(e2, O2())), window.dispatchEvent(new o("single-spa:routing-event", O2()));
    } catch (t3) {
      setTimeout(function() {
        throw t3;
      });
    }
    if (Dt = false, Ut.length > 0) {
      var i3 = Ut;
      Ut = [], Lt(i3);
    }
    return n3;
  }
  function y2() {
    t2.forEach(function(t3) {
      et(t3.eventArguments);
    }), et(n2);
  }
  function O2() {
    var t3, o2 = arguments.length > 0 && void 0 !== arguments[0] && arguments[0], i3 = arguments.length > 1 ? arguments[1] : void 0, m3 = {}, d3 = (e(t3 = {}, w, []), e(t3, v, []), e(t3, l, []), e(t3, P, []), t3);
    o2 ? (c2.concat(s2).forEach(function(t4, n3) {
      E3(t4, w);
    }), u2.forEach(function(t4) {
      E3(t4, l);
    }), a2.forEach(function(t4) {
      E3(t4, v);
    })) : r2.forEach(function(t4) {
      E3(t4);
    });
    var g3 = { detail: { newAppStatuses: m3, appsByNewStatus: d3, totalAppChanges: r2.length, originalEvent: null == n2 ? void 0 : n2[0], oldUrl: p2, newUrl: h2, navigationIsCanceled: f2 } };
    return i3 && S(g3.detail, i3), g3;
    function E3(t4, n3) {
      var e2 = T(t4);
      n3 = n3 || Pt(e2), m3[e2] = n3, (d3[n3] = d3[n3] || []).push(e2);
    }
  }
}
function Rt(t2, n2) {
  return b(t2) ? M(t2).then(function(t3) {
    return n2.then(function() {
      return b(t3) ? x(t3) : t3;
    });
  }) : n2.then(function() {
    return t2;
  });
}
var It = false;
function xt(t2) {
  var n2;
  It = true, t2 && t2.urlRerouteOnly && (n2 = t2.urlRerouteOnly, X = n2), Y && Lt();
}
function Bt() {
  return It;
}
Y && setTimeout(function() {
  It || console.warn(s(1, false));
}, 5e3);
var Gt = { getRawAppData: function() {
  return [].concat(wt);
}, reroute: Lt, NOT_LOADED: l, toLoadPromise: z, toBootstrapPromise: M, unregisterApplication: Tt };
Y && window.__SINGLE_SPA_DEVTOOLS__ && (window.__SINGLE_SPA_DEVTOOLS__.exposedMethods = Gt);
function arrayPush$4(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var _arrayPush = arrayPush$4;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$8 = freeGlobal || freeSelf || Function("return this")();
var _root = root$8;
var root$7 = _root;
var Symbol$6 = root$7.Symbol;
var _Symbol = Symbol$6;
var Symbol$5 = _Symbol;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$5 ? Symbol$5.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$4 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$4 ? Symbol$4.toStringTag : void 0;
function baseGetTag$6(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$6;
function isObjectLike$8(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$8;
var baseGetTag$5 = _baseGetTag, isObjectLike$7 = isObjectLike_1;
var argsTag$2 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$7(value) && baseGetTag$5(value) == argsTag$2;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$6 = isObjectLike_1;
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;
var isArguments$3 = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$6(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments_1 = isArguments$3;
var isArray$8 = Array.isArray;
var isArray_1 = isArray$8;
var Symbol$3 = _Symbol, isArguments$2 = isArguments_1, isArray$7 = isArray_1;
var spreadableSymbol = Symbol$3 ? Symbol$3.isConcatSpreadable : void 0;
function isFlattenable$1(value) {
  return isArray$7(value) || isArguments$2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
var _isFlattenable = isFlattenable$1;
var arrayPush$3 = _arrayPush, isFlattenable = _isFlattenable;
function baseFlatten$1(array, depth, predicate, isStrict, result) {
  var index = -1, length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten$1(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush$3(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}
var _baseFlatten = baseFlatten$1;
function copyArray$3(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$3;
var arrayPush$2 = _arrayPush, baseFlatten = _baseFlatten, copyArray$2 = _copyArray, isArray$6 = isArray_1;
function concat() {
  var length = arguments.length;
  if (!length) {
    return [];
  }
  var args = Array(length - 1), array = arguments[0], index = length;
  while (index--) {
    args[index - 1] = arguments[index];
  }
  return arrayPush$2(isArray$6(array) ? copyArray$2(array) : [array], baseFlatten(args, 1));
}
var concat_1 = concat;
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
function isObject$9(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$9;
var baseGetTag$4 = _baseGetTag, isObject$8 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$8(value)) {
    return false;
  }
  var tag = baseGetTag$4(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$6 = _root;
var coreJsData$1 = root$6["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var _toSource = toSource$2;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$7 = isObject_1, toSource$1 = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$a = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$7(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$7(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$7;
var getNative$6 = _getNative, root$5 = _root;
var Map$4 = getNative$6(root$5, "Map");
var _Map = Map$4;
var getNative$5 = _getNative;
var nativeCreate$4 = getNative$5(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$3 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$3 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$2.prototype.clear = mapCacheClear;
MapCache$2.prototype["delete"] = mapCacheDelete;
MapCache$2.prototype.get = mapCacheGet;
MapCache$2.prototype.has = mapCacheHas;
MapCache$2.prototype.set = mapCacheSet;
var _MapCache = MapCache$2;
var ListCache$1 = _ListCache, Map$2 = _Map, MapCache$1 = _MapCache;
var LARGE_ARRAY_SIZE$1 = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$1(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$2(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$2.prototype.clear = stackClear;
Stack$2.prototype["delete"] = stackDelete;
Stack$2.prototype.get = stackGet;
Stack$2.prototype.has = stackHas;
Stack$2.prototype.set = stackSet;
var _Stack = Stack$2;
var getNative$4 = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative$4(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$2 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$2(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props2 = keysFunc(object), length = props2.length;
    while (length--) {
      var key = props2[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$2 = createBaseFor();
var _baseFor = baseFor$2;
var _cloneBufferExports = {};
var _cloneBuffer = {
  get exports() {
    return _cloneBufferExports;
  },
  set exports(v2) {
    _cloneBufferExports = v2;
  }
};
(function(module2, exports2) {
  var root2 = _root;
  var freeExports = exports2 && !exports2.nodeType && exports2;
  var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module2.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBufferExports);
var root$4 = _root;
var Uint8Array$1 = root$4.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array = _Uint8Array;
function cloneArrayBuffer$3(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$3;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
var isObject$6 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$6(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
function overArg$2(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$2;
var overArg$1 = _overArg;
var getPrototype$3 = overArg$1(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$3;
var objectProto$7 = Object.prototype;
function isPrototype$3(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$7;
  return value === proto;
}
var _isPrototype = isPrototype$3;
var baseCreate = _baseCreate, getPrototype$2 = _getPrototype, isPrototype$2 = _isPrototype;
function initCloneObject$2(object) {
  return typeof object.constructor == "function" && !isPrototype$2(object) ? baseCreate(getPrototype$2(object)) : {};
}
var _initCloneObject = initCloneObject$2;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength$2;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$5(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$5;
var isArrayLike$4 = isArrayLike_1, isObjectLike$5 = isObjectLike_1;
function isArrayLikeObject$2(value) {
  return isObjectLike$5(value) && isArrayLike$4(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$2;
var isBufferExports = {};
var isBuffer$3 = {
  get exports() {
    return isBufferExports;
  },
  set exports(v2) {
    isBufferExports = v2;
  }
};
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
(function(module2, exports2) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports2 && !exports2.nodeType && exports2;
  var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module2.exports = isBuffer2;
})(isBuffer$3, isBufferExports);
var baseGetTag$3 = _baseGetTag, getPrototype$1 = _getPrototype, isObjectLike$4 = isObjectLike_1;
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$6 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike$4(value) || baseGetTag$3(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$5.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
var baseGetTag$2 = _baseGetTag, isLength = isLength_1, isObjectLike$3 = isObjectLike_1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$3(value) && isLength(value.length) && !!typedArrayTags[baseGetTag$2(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$4(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$4;
var _nodeUtilExports = {};
var _nodeUtil = {
  get exports() {
    return _nodeUtilExports;
  },
  set exports(v2) {
    _nodeUtilExports = v2;
  }
};
(function(module2, exports2) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports2 && !exports2.nodeType && exports2;
  var freeModule = freeExports && true && module2 && !module2.nodeType && module2;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e2) {
    }
  }();
  module2.exports = nodeUtil2;
})(_nodeUtil, _nodeUtilExports);
var baseIsTypedArray = _baseIsTypedArray, baseUnary$3 = _baseUnary, nodeUtil$2 = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary$3(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var baseAssignValue$1 = _baseAssignValue, eq$1 = eq_1;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function assignValue$2(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$4.call(object, key) && eq$1(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$2;
var assignValue$1 = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$5(source, props2, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props2.length;
  while (++index < length) {
    var key = props2[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue$1(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$5;
function baseTimes$1(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$2;
var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$5 = isArray_1, isBuffer$2 = isBufferExports, isIndex$1 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function arrayLikeKeys$2(value, inherited) {
  var isArr = isArray$5(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$2(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$1(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$2;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$5 = isObject_1, isPrototype$1 = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$5(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype$1(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$2.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$3 = isArrayLike_1;
function keysIn$5(object) {
  return isArrayLike$3(object) ? arrayLikeKeys$1(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$5;
var copyObject$4 = _copyObject, keysIn$4 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject$4(value, keysIn$4(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer$1 = _cloneBufferExports, cloneTypedArray$1 = _cloneTypedArray, copyArray$1 = _copyArray, initCloneObject$1 = _initCloneObject, isArguments = isArguments_1, isArray$4 = isArray_1, isArrayLikeObject$1 = isArrayLikeObject_1, isBuffer$1 = isBufferExports, isFunction = isFunction_1, isObject$4 = isObject_1, isPlainObject = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$4(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$4(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject$1(objValue)) {
        newValue = copyArray$1(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer$1(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray$1(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$4(objValue) || isFunction(objValue)) {
        newValue = initCloneObject$1(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack$1 = _Stack, assignMergeValue = _assignMergeValue, baseFor$1 = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$3 = isObject_1, keysIn$3 = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack$1());
    if (isObject$3(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn$3);
}
var _baseMerge = baseMerge$1;
function identity$3(value) {
  return value;
}
var identity_1 = identity$3;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$1(func, start2, transform) {
  start2 = nativeMax(start2 === void 0 ? func.length - 1 : start2, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start2, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start2 + index];
    }
    index = -1;
    var otherArgs = Array(start2 + 1);
    while (++index < start2) {
      otherArgs[index] = args[index];
    }
    otherArgs[start2] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$1;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
var constant = constant_1, defineProperty = _defineProperty, identity$2 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$2 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$1 = shortOut(baseSetToString);
var _setToString = setToString$1;
var identity$1 = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$2(func, start2) {
  return setToString(overRest(func, start2, identity$1), func + "");
}
var _baseRest = baseRest$2;
var eq = eq_1, isArrayLike$2 = isArrayLike_1, isIndex = _isIndex, isObject$2 = isObject_1;
function isIterateeCall$1(value, index, object) {
  if (!isObject$2(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike$2(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest$1 = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest$1(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});
var mergeWith_1 = mergeWith;
function arrayEach$2(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$2;
var overArg = _overArg;
var nativeKeys$1 = overArg(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype = _isPrototype, nativeKeys = _nativeKeys;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$1.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike$1 = isArrayLike_1;
function keys$4(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var keys_1 = keys$4;
var baseFor = _baseFor, keys$3 = keys_1;
function baseForOwn$1(object, iteratee) {
  return object && baseFor(object, iteratee, keys$3);
}
var _baseForOwn = baseForOwn$1;
var isArrayLike = isArrayLike_1;
function createBaseEach$1(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach$1;
var baseForOwn = _baseForOwn, createBaseEach = _createBaseEach;
var baseEach$1 = createBaseEach(baseForOwn);
var _baseEach = baseEach$1;
var identity = identity_1;
function castFunction$1(value) {
  return typeof value == "function" ? value : identity;
}
var _castFunction = castFunction$1;
var arrayEach$1 = _arrayEach, baseEach = _baseEach, castFunction = _castFunction, isArray$3 = isArray_1;
function forEach(collection, iteratee) {
  var func = isArray$3(collection) ? arrayEach$1 : baseEach;
  return func(collection, castFunction(iteratee));
}
var forEach_1 = forEach;
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArrayLimit(arr, i2) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s, _e, _x, _r, _arr = [], _n = true, _d = false;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i2) {
        if (Object(_i) !== _i)
          return;
        _n = false;
      } else
        for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i2); _n = true)
          ;
    } catch (err) {
      _d = true, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r))
          return;
      } finally {
        if (_d)
          throw _e;
      }
    }
    return _arr;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _slicedToArray(arr, i2) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i2) || _unsupportedIterableToArray(arr, i2) || _nonIterableRest();
}
var isIE11 = typeof navigator !== "undefined" && navigator.userAgent.indexOf("Trident") !== -1;
function shouldSkipProperty(global2, p2) {
  if (!global2.hasOwnProperty(p2) || !isNaN(p2) && p2 < global2.length)
    return true;
  if (isIE11) {
    try {
      return global2[p2] && typeof window !== "undefined" && global2[p2].parent === window;
    } catch (err) {
      return true;
    }
  } else {
    return false;
  }
}
var firstGlobalProp, secondGlobalProp, lastGlobalProp;
function getGlobalProp(global2) {
  var cnt = 0;
  var lastProp;
  var hasIframe = false;
  for (var p2 in global2) {
    if (shouldSkipProperty(global2, p2))
      continue;
    for (var i2 = 0; i2 < window.frames.length && !hasIframe; i2++) {
      var frame = window.frames[i2];
      if (frame === global2[p2]) {
        hasIframe = true;
        break;
      }
    }
    if (!hasIframe && (cnt === 0 && p2 !== firstGlobalProp || cnt === 1 && p2 !== secondGlobalProp))
      return p2;
    cnt++;
    lastProp = p2;
  }
  if (lastProp !== lastGlobalProp)
    return lastProp;
}
function noteGlobalProps(global2) {
  firstGlobalProp = secondGlobalProp = void 0;
  for (var p2 in global2) {
    if (shouldSkipProperty(global2, p2))
      continue;
    if (!firstGlobalProp)
      firstGlobalProp = p2;
    else if (!secondGlobalProp)
      secondGlobalProp = p2;
    lastGlobalProp = p2;
  }
  return lastGlobalProp;
}
function getInlineCode(match) {
  var start2 = match.indexOf(">") + 1;
  var end = match.lastIndexOf("<");
  return match.substring(start2, end);
}
function defaultGetPublicPath(entry) {
  if (_typeof$1(entry) === "object") {
    return "/";
  }
  try {
    var _URL = new URL(entry, location.href), origin = _URL.origin, pathname = _URL.pathname;
    var paths = pathname.split("/");
    paths.pop();
    return "".concat(origin).concat(paths.join("/"), "/");
  } catch (e2) {
    console.warn(e2);
    return "";
  }
}
function isModuleScriptSupported() {
  var s2 = document.createElement("script");
  return "noModule" in s2;
}
var requestIdleCallback$1 = window.requestIdleCallback || function requestIdleCallback(cb) {
  var start2 = Date.now();
  return setTimeout(function() {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start2));
      }
    });
  }, 1);
};
function readResAsString(response, autoDetectCharset) {
  if (!autoDetectCharset) {
    return response.text();
  }
  if (!response.headers) {
    return response.text();
  }
  var contentType = response.headers.get("Content-Type");
  if (!contentType) {
    return response.text();
  }
  var charset = "utf-8";
  var parts = contentType.split(";");
  if (parts.length === 2) {
    var _parts$1$split = parts[1].split("="), _parts$1$split2 = _slicedToArray(_parts$1$split, 2), value = _parts$1$split2[1];
    var encoding = value && value.trim();
    if (encoding) {
      charset = encoding;
    }
  }
  if (charset.toUpperCase() === "UTF-8") {
    return response.text();
  }
  return response.blob().then(function(file) {
    return new Promise(function(resolve, reject) {
      var reader = new window.FileReader();
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file, charset);
    });
  });
}
var evalCache = {};
function evalCode(scriptSrc, code) {
  var key = scriptSrc;
  if (!evalCache[key]) {
    var functionWrappedCode = "(function(){".concat(code, "})");
    evalCache[key] = (0, eval)(functionWrappedCode);
  }
  var evalFunc = evalCache[key];
  evalFunc.call(window);
}
function parseUrl(url) {
  var parser = new DOMParser();
  var html = '<script src="'.concat(url, '"><\/script>');
  var doc = parser.parseFromString(html, "text/html");
  return doc.scripts[0].src;
}
var ALL_SCRIPT_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi;
var SCRIPT_TAG_REGEX = /<(script)\s+((?!type=('|")text\/ng\x2Dtemplate\3)[\s\S])*?>[\s\S]*?<\/\1>/i;
var SCRIPT_SRC_REGEX = /.*\ssrc=('|")?([^>'"\s]+)/;
var SCRIPT_TYPE_REGEX = /.*\stype=('|")?([^>'"\s]+)/;
var SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/;
var SCRIPT_ASYNC_REGEX = /.*\sasync\s*.*/;
var SCRIPT_NO_MODULE_REGEX = /.*\snomodule\s*.*/;
var SCRIPT_MODULE_REGEX = /.*\stype=('|")?module('|")?\s*.*/;
var LINK_TAG_REGEX = /<(link)\s+[\s\S]*?>/ig;
var LINK_PRELOAD_OR_PREFETCH_REGEX = /\srel=('|")?(preload|prefetch)\1/;
var LINK_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
var LINK_AS_FONT = /.*\sas=('|")?font\1.*/;
var STYLE_TAG_REGEX = /<style[^>]*>[\s\S]*?<\/style>/gi;
var STYLE_TYPE_REGEX = /\s+rel=('|")?stylesheet\1.*/;
var STYLE_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
var HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;
var LINK_IGNORE_REGEX = /<link(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
var STYLE_IGNORE_REGEX = /<style(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
var SCRIPT_IGNORE_REGEX = /<script(\s+|\s+[\s\S]+\s+)ignore(\s*|\s+[\s\S]*|=[\s\S]*)>/i;
function hasProtocol(url) {
  return url.startsWith("http://") || url.startsWith("https://");
}
function getEntirePath(path, baseURI) {
  return new URL(path, baseURI).toString();
}
function isValidJavaScriptType(type) {
  var handleTypes = ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"];
  return !type || handleTypes.indexOf(type) !== -1;
}
var genLinkReplaceSymbol = function genLinkReplaceSymbol2(linkHref) {
  var preloadOrPrefetch = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  return "<!-- ".concat(preloadOrPrefetch ? "prefetch/preload" : "", " link ").concat(linkHref, " replaced by import-html-entry -->");
};
var genScriptReplaceSymbol = function genScriptReplaceSymbol2(scriptSrc) {
  var async = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  return "<!-- ".concat(async ? "async" : "", " script ").concat(scriptSrc, " replaced by import-html-entry -->");
};
var inlineScriptReplaceSymbol = "<!-- inline scripts replaced by import-html-entry -->";
var genIgnoreAssetReplaceSymbol = function genIgnoreAssetReplaceSymbol2(url) {
  return "<!-- ignore asset ".concat(url || "file", " replaced by import-html-entry -->");
};
var genModuleScriptReplaceSymbol = function genModuleScriptReplaceSymbol2(scriptSrc, moduleSupport) {
  return "<!-- ".concat(moduleSupport ? "nomodule" : "module", " script ").concat(scriptSrc, " ignored by import-html-entry -->");
};
function processTpl(tpl, baseURI, postProcessTemplate) {
  var scripts = [];
  var styles = [];
  var entry = null;
  var moduleSupport = isModuleScriptSupported();
  var template = tpl.replace(HTML_COMMENT_REGEX, "").replace(LINK_TAG_REGEX, function(match) {
    var styleType = !!match.match(STYLE_TYPE_REGEX);
    if (styleType) {
      var styleHref = match.match(STYLE_HREF_REGEX);
      var styleIgnore = match.match(LINK_IGNORE_REGEX);
      if (styleHref) {
        var href = styleHref && styleHref[2];
        var newHref = href;
        if (href && !hasProtocol(href)) {
          newHref = getEntirePath(href, baseURI);
        }
        if (styleIgnore) {
          return genIgnoreAssetReplaceSymbol(newHref);
        }
        newHref = parseUrl(newHref);
        styles.push(newHref);
        return genLinkReplaceSymbol(newHref);
      }
    }
    var preloadOrPrefetchType = match.match(LINK_PRELOAD_OR_PREFETCH_REGEX) && match.match(LINK_HREF_REGEX) && !match.match(LINK_AS_FONT);
    if (preloadOrPrefetchType) {
      var _match$match = match.match(LINK_HREF_REGEX), _match$match2 = _slicedToArray(_match$match, 3), linkHref = _match$match2[2];
      return genLinkReplaceSymbol(linkHref, true);
    }
    return match;
  }).replace(STYLE_TAG_REGEX, function(match) {
    if (STYLE_IGNORE_REGEX.test(match)) {
      return genIgnoreAssetReplaceSymbol("style file");
    }
    return match;
  }).replace(ALL_SCRIPT_REGEX, function(match, scriptTag) {
    var scriptIgnore = scriptTag.match(SCRIPT_IGNORE_REGEX);
    var moduleScriptIgnore = moduleSupport && !!scriptTag.match(SCRIPT_NO_MODULE_REGEX) || !moduleSupport && !!scriptTag.match(SCRIPT_MODULE_REGEX);
    var matchedScriptTypeMatch = scriptTag.match(SCRIPT_TYPE_REGEX);
    var matchedScriptType = matchedScriptTypeMatch && matchedScriptTypeMatch[2];
    if (!isValidJavaScriptType(matchedScriptType)) {
      return match;
    }
    if (SCRIPT_TAG_REGEX.test(match) && scriptTag.match(SCRIPT_SRC_REGEX)) {
      var matchedScriptEntry = scriptTag.match(SCRIPT_ENTRY_REGEX);
      var matchedScriptSrcMatch = scriptTag.match(SCRIPT_SRC_REGEX);
      var matchedScriptSrc = matchedScriptSrcMatch && matchedScriptSrcMatch[2];
      if (entry && matchedScriptEntry) {
        throw new SyntaxError("You should not set multiply entry script!");
      }
      if (matchedScriptSrc) {
        if (!hasProtocol(matchedScriptSrc)) {
          matchedScriptSrc = getEntirePath(matchedScriptSrc, baseURI);
        }
        matchedScriptSrc = parseUrl(matchedScriptSrc);
      }
      entry = entry || matchedScriptEntry && matchedScriptSrc;
      if (scriptIgnore) {
        return genIgnoreAssetReplaceSymbol(matchedScriptSrc || "js file");
      }
      if (moduleScriptIgnore) {
        return genModuleScriptReplaceSymbol(matchedScriptSrc || "js file", moduleSupport);
      }
      if (matchedScriptSrc) {
        var asyncScript = !!scriptTag.match(SCRIPT_ASYNC_REGEX);
        scripts.push(asyncScript ? {
          async: true,
          src: matchedScriptSrc
        } : matchedScriptSrc);
        return genScriptReplaceSymbol(matchedScriptSrc, asyncScript);
      }
      return match;
    } else {
      if (scriptIgnore) {
        return genIgnoreAssetReplaceSymbol("js file");
      }
      if (moduleScriptIgnore) {
        return genModuleScriptReplaceSymbol("js file", moduleSupport);
      }
      var code = getInlineCode(match);
      var isPureCommentBlock = code.split(/[\r\n]+/).every(function(line) {
        return !line.trim() || line.trim().startsWith("//");
      });
      if (!isPureCommentBlock) {
        scripts.push(match);
      }
      return inlineScriptReplaceSymbol;
    }
  });
  scripts = scripts.filter(function(script) {
    return !!script;
  });
  var tplResult = {
    template,
    scripts,
    styles,
    // set the last script as entry if have not set
    entry: entry || scripts[scripts.length - 1]
  };
  if (typeof postProcessTemplate === "function") {
    tplResult = postProcessTemplate(tplResult);
  }
  return tplResult;
}
function ownKeys(object, enumerableOnly) {
  var keys2 = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys2.push.apply(keys2, symbols);
  }
  return keys2;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = null != arguments[i2] ? arguments[i2] : {};
    i2 % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
var styleCache = {};
var scriptCache = {};
var embedHTMLCache = {};
if (!window.fetch) {
  throw new Error('[import-html-entry] Here is no "fetch" on the window env, you need to polyfill it');
}
var defaultFetch = window.fetch.bind(window);
function defaultGetTemplate(tpl) {
  return tpl;
}
function getEmbedHTML(template, styles) {
  var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var _opts$fetch = opts.fetch, fetch2 = _opts$fetch === void 0 ? defaultFetch : _opts$fetch;
  var embedHTML = template;
  return _getExternalStyleSheets(styles, fetch2).then(function(styleSheets) {
    embedHTML = styles.reduce(function(html, styleSrc, i2) {
      html = html.replace(genLinkReplaceSymbol(styleSrc), isInlineCode(styleSrc) ? "".concat(styleSrc) : "<style>/* ".concat(styleSrc, " */").concat(styleSheets[i2], "</style>"));
      return html;
    }, embedHTML);
    return embedHTML;
  });
}
var isInlineCode = function isInlineCode2(code) {
  return code.startsWith("<");
};
function getExecutableScript(scriptSrc, scriptText) {
  var opts = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var proxy = opts.proxy, strictGlobal = opts.strictGlobal, _opts$scopedGlobalVar = opts.scopedGlobalVariables, scopedGlobalVariables = _opts$scopedGlobalVar === void 0 ? [] : _opts$scopedGlobalVar;
  var sourceUrl = isInlineCode(scriptSrc) ? "" : "//# sourceURL=".concat(scriptSrc, "\n");
  var scopedGlobalVariableDefinition = scopedGlobalVariables.length ? "const {".concat(scopedGlobalVariables.join(","), "}=this;") : "";
  var globalWindow = (0, eval)("window");
  globalWindow.proxy = proxy;
  return strictGlobal ? scopedGlobalVariableDefinition ? ";(function(){with(this){".concat(scopedGlobalVariableDefinition).concat(scriptText, "\n").concat(sourceUrl, "}}).bind(window.proxy)();") : ";(function(window, self, globalThis){with(window){;".concat(scriptText, "\n").concat(sourceUrl, "}}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);") : ";(function(window, self, globalThis){;".concat(scriptText, "\n").concat(sourceUrl, "}).bind(window.proxy)(window.proxy, window.proxy, window.proxy);");
}
function _getExternalStyleSheets(styles) {
  var fetch2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultFetch;
  return Promise.all(styles.map(function(styleLink) {
    if (isInlineCode(styleLink)) {
      return getInlineCode(styleLink);
    } else {
      return styleCache[styleLink] || (styleCache[styleLink] = fetch2(styleLink).then(function(response) {
        return response.text();
      }));
    }
  }));
}
function _getExternalScripts(scripts) {
  var fetch2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultFetch;
  var errorCallback = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
  };
  var fetchScript = function fetchScript2(scriptUrl) {
    return scriptCache[scriptUrl] || (scriptCache[scriptUrl] = fetch2(scriptUrl).then(function(response) {
      if (response.status >= 400) {
        throw new Error("".concat(scriptUrl, " load failed with status ").concat(response.status));
      }
      return response.text();
    })["catch"](function(e2) {
      errorCallback();
      throw e2;
    }));
  };
  return Promise.all(scripts.map(function(script) {
    if (typeof script === "string") {
      if (isInlineCode(script)) {
        return getInlineCode(script);
      } else {
        return fetchScript(script);
      }
    } else {
      var src = script.src, async = script.async;
      if (async) {
        return {
          src,
          async: true,
          content: new Promise(function(resolve, reject) {
            return requestIdleCallback$1(function() {
              return fetchScript(src).then(resolve, reject);
            });
          })
        };
      }
      return fetchScript(src);
    }
  }));
}
function throwNonBlockingError(error, msg) {
  setTimeout(function() {
    console.error(msg);
    throw error;
  });
}
var supportsUserTiming$1 = typeof performance !== "undefined" && typeof performance.mark === "function" && typeof performance.clearMarks === "function" && typeof performance.measure === "function" && typeof performance.clearMeasures === "function";
function _execScripts(entry, scripts) {
  var proxy = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window;
  var opts = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var _opts$fetch2 = opts.fetch, fetch2 = _opts$fetch2 === void 0 ? defaultFetch : _opts$fetch2, _opts$strictGlobal = opts.strictGlobal, strictGlobal = _opts$strictGlobal === void 0 ? false : _opts$strictGlobal, success = opts.success, _opts$error = opts.error, error = _opts$error === void 0 ? function() {
  } : _opts$error, _opts$beforeExec = opts.beforeExec, beforeExec = _opts$beforeExec === void 0 ? function() {
  } : _opts$beforeExec, _opts$afterExec = opts.afterExec, afterExec = _opts$afterExec === void 0 ? function() {
  } : _opts$afterExec, _opts$scopedGlobalVar2 = opts.scopedGlobalVariables, scopedGlobalVariables = _opts$scopedGlobalVar2 === void 0 ? [] : _opts$scopedGlobalVar2;
  return _getExternalScripts(scripts, fetch2, error).then(function(scriptsText) {
    var geval = function geval2(scriptSrc, inlineScript) {
      var rawCode = beforeExec(inlineScript, scriptSrc) || inlineScript;
      var code = getExecutableScript(scriptSrc, rawCode, {
        proxy,
        strictGlobal,
        scopedGlobalVariables
      });
      evalCode(scriptSrc, code);
      afterExec(inlineScript, scriptSrc);
    };
    function exec(scriptSrc, inlineScript, resolve) {
      var markName = "Evaluating script ".concat(scriptSrc);
      var measureName = "Evaluating Time Consuming: ".concat(scriptSrc);
      if (process.env.NODE_ENV === "development" && supportsUserTiming$1) {
        performance.mark(markName);
      }
      if (scriptSrc === entry) {
        noteGlobalProps(strictGlobal ? proxy : window);
        try {
          geval(scriptSrc, inlineScript);
          var exports2 = proxy[getGlobalProp(strictGlobal ? proxy : window)] || {};
          resolve(exports2);
        } catch (e2) {
          console.error("[import-html-entry]: error occurs while executing entry script ".concat(scriptSrc));
          throw e2;
        }
      } else {
        if (typeof inlineScript === "string") {
          try {
            geval(scriptSrc, inlineScript);
          } catch (e2) {
            throwNonBlockingError(e2, "[import-html-entry]: error occurs while executing normal script ".concat(scriptSrc));
          }
        } else {
          inlineScript.async && (inlineScript === null || inlineScript === void 0 ? void 0 : inlineScript.content.then(function(downloadedScriptText) {
            return geval(inlineScript.src, downloadedScriptText);
          })["catch"](function(e2) {
            throwNonBlockingError(e2, "[import-html-entry]: error occurs while executing async script ".concat(inlineScript.src));
          }));
        }
      }
      if (process.env.NODE_ENV === "development" && supportsUserTiming$1) {
        performance.measure(measureName, markName);
        performance.clearMarks(markName);
        performance.clearMeasures(measureName);
      }
    }
    function schedule(i2, resolvePromise) {
      if (i2 < scripts.length) {
        var scriptSrc = scripts[i2];
        var inlineScript = scriptsText[i2];
        exec(scriptSrc, inlineScript, resolvePromise);
        if (!entry && i2 === scripts.length - 1) {
          resolvePromise();
        } else {
          schedule(i2 + 1, resolvePromise);
        }
      }
    }
    return new Promise(function(resolve) {
      return schedule(0, success || resolve);
    });
  });
}
function importHTML(url) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var fetch2 = defaultFetch;
  var autoDecodeResponse = false;
  var getPublicPath = defaultGetPublicPath;
  var getTemplate = defaultGetTemplate;
  var postProcessTemplate = opts.postProcessTemplate;
  if (typeof opts === "function") {
    fetch2 = opts;
  } else {
    if (opts.fetch) {
      if (typeof opts.fetch === "function") {
        fetch2 = opts.fetch;
      } else {
        fetch2 = opts.fetch.fn || defaultFetch;
        autoDecodeResponse = !!opts.fetch.autoDecodeResponse;
      }
    }
    getPublicPath = opts.getPublicPath || opts.getDomain || defaultGetPublicPath;
    getTemplate = opts.getTemplate || defaultGetTemplate;
  }
  return embedHTMLCache[url] || (embedHTMLCache[url] = fetch2(url).then(function(response) {
    return readResAsString(response, autoDecodeResponse);
  }).then(function(html) {
    var assetPublicPath = getPublicPath(url);
    var _processTpl = processTpl(getTemplate(html), assetPublicPath, postProcessTemplate), template = _processTpl.template, scripts = _processTpl.scripts, entry = _processTpl.entry, styles = _processTpl.styles;
    return getEmbedHTML(template, styles, {
      fetch: fetch2
    }).then(function(embedHTML) {
      return {
        template: embedHTML,
        assetPublicPath,
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts, fetch2);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles, fetch2);
        },
        execScripts: function execScripts(proxy, strictGlobal) {
          var opts2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if (!scripts.length) {
            return Promise.resolve();
          }
          return _execScripts(entry, scripts, proxy, _objectSpread({
            fetch: fetch2,
            strictGlobal
          }, opts2));
        }
      };
    });
  }));
}
function importEntry(entry) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _opts$fetch3 = opts.fetch, fetch2 = _opts$fetch3 === void 0 ? defaultFetch : _opts$fetch3, _opts$getTemplate = opts.getTemplate, getTemplate = _opts$getTemplate === void 0 ? defaultGetTemplate : _opts$getTemplate, postProcessTemplate = opts.postProcessTemplate;
  var getPublicPath = opts.getPublicPath || opts.getDomain || defaultGetPublicPath;
  if (!entry) {
    throw new SyntaxError("entry should not be empty!");
  }
  if (typeof entry === "string") {
    return importHTML(entry, {
      fetch: fetch2,
      getPublicPath,
      getTemplate,
      postProcessTemplate
    });
  }
  if (Array.isArray(entry.scripts) || Array.isArray(entry.styles)) {
    var _entry$scripts = entry.scripts, scripts = _entry$scripts === void 0 ? [] : _entry$scripts, _entry$styles = entry.styles, styles = _entry$styles === void 0 ? [] : _entry$styles, _entry$html = entry.html, html = _entry$html === void 0 ? "" : _entry$html;
    var getHTMLWithStylePlaceholder = function getHTMLWithStylePlaceholder2(tpl) {
      return styles.reduceRight(function(html2, styleSrc) {
        return "".concat(genLinkReplaceSymbol(styleSrc)).concat(html2);
      }, tpl);
    };
    var getHTMLWithScriptPlaceholder = function getHTMLWithScriptPlaceholder2(tpl) {
      return scripts.reduce(function(html2, scriptSrc) {
        return "".concat(html2).concat(genScriptReplaceSymbol(scriptSrc));
      }, tpl);
    };
    return getEmbedHTML(getTemplate(getHTMLWithScriptPlaceholder(getHTMLWithStylePlaceholder(html))), styles, {
      fetch: fetch2
    }).then(function(embedHTML) {
      return {
        template: embedHTML,
        assetPublicPath: getPublicPath(entry),
        getExternalScripts: function getExternalScripts() {
          return _getExternalScripts(scripts, fetch2);
        },
        getExternalStyleSheets: function getExternalStyleSheets() {
          return _getExternalStyleSheets(styles, fetch2);
        },
        execScripts: function execScripts(proxy, strictGlobal) {
          var opts2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
          if (!scripts.length) {
            return Promise.resolve();
          }
          return _execScripts(scripts[scripts.length - 1], scripts, proxy, _objectSpread({
            fetch: fetch2,
            strictGlobal
          }, opts2));
        }
      };
    });
  } else {
    throw new SyntaxError("entry scripts or styles should be array!");
  }
}
function getAddOn$1(global2) {
  return {
    beforeLoad: function beforeLoad() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                global2.__POWERED_BY_QIANKUN__ = true;
              case 1:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }))();
    },
    beforeMount: function beforeMount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                global2.__POWERED_BY_QIANKUN__ = true;
              case 1:
              case "end":
                return _context2.stop();
            }
        }, _callee2);
      }))();
    },
    beforeUnmount: function beforeUnmount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1)
            switch (_context3.prev = _context3.next) {
              case 0:
                delete global2.__POWERED_BY_QIANKUN__;
              case 1:
              case "end":
                return _context3.stop();
            }
        }, _callee3);
      }))();
    }
  };
}
var rawPublicPath = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
function getAddOn(global2) {
  var publicPath = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "/";
  var hasMountedOnce = false;
  return {
    beforeLoad: function beforeLoad() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                global2.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = publicPath;
              case 1:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }))();
    },
    beforeMount: function beforeMount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                if (hasMountedOnce) {
                  global2.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = publicPath;
                }
              case 1:
              case "end":
                return _context2.stop();
            }
        }, _callee2);
      }))();
    },
    beforeUnmount: function beforeUnmount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee3() {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1)
            switch (_context3.prev = _context3.next) {
              case 0:
                if (rawPublicPath === void 0) {
                  delete global2.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
                } else {
                  global2.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = rawPublicPath;
                }
                hasMountedOnce = true;
              case 2:
              case "end":
                return _context3.stop();
            }
        }, _callee3);
      }))();
    }
  };
}
function getAddOns(global2, publicPath) {
  return mergeWith_1({}, getAddOn$1(global2), getAddOn(global2, publicPath), function(v1, v2) {
    return concat_1(v1 !== null && v1 !== void 0 ? v1 : [], v2 !== null && v2 !== void 0 ? v2 : []);
  });
}
function _defineProperties(target, props2) {
  for (var i2 = 0; i2 < props2.length; i2++) {
    var descriptor = props2[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a2 = [null];
      a2.push.apply(a2, args2);
      var Constructor = Function.bind.apply(Parent2, a2);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var QiankunError = /* @__PURE__ */ function(_Error) {
  _inherits(QiankunError2, _Error);
  var _super = _createSuper(QiankunError2);
  function QiankunError2(message) {
    _classCallCheck(this, QiankunError2);
    return _super.call(this, "[qiankun]: ".concat(message));
  }
  return _createClass(QiankunError2);
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var copyObject$3 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$3(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
var copyObject$2 = _copyObject, keysIn$2 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$2(source, keysIn$2(source), object);
}
var _baseAssignIn = baseAssignIn$1;
function arrayFilter$1(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$1;
function stubArray$2() {
  return [];
}
var stubArray_1 = stubArray$2;
var arrayFilter = _arrayFilter, stubArray$1 = stubArray_1;
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var _getSymbols = getSymbols$3;
var copyObject$1 = _copyObject, getSymbols$2 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$1(source, getSymbols$2(source), object);
}
var _copySymbols = copySymbols$1;
var arrayPush$1 = _arrayPush, getPrototype = _getPrototype, getSymbols$1 = _getSymbols, stubArray = stubArray_1;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$1(object));
    object = getPrototype(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var arrayPush = _arrayPush, isArray$2 = isArray_1;
function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$2;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbols = _getSymbols, keys$1 = keys_1;
function getAllKeys$1(object) {
  return baseGetAllKeys$1(object, keys$1, getSymbols);
}
var _getAllKeys = getAllKeys$1;
var baseGetAllKeys = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$1 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var getNative$3 = _getNative, root$3 = _root;
var DataView$1 = getNative$3(root$3, "DataView");
var _DataView = DataView$1;
var getNative$2 = _getNative, root$2 = _root;
var Promise$2 = getNative$2(root$2, "Promise");
var _Promise = Promise$2;
var getNative$1 = _getNative, root$1 = _root;
var Set$2 = getNative$1(root$1, "Set");
var _Set = Set$2;
var getNative = _getNative, root = _root;
var WeakMap$2 = getNative(root, "WeakMap");
var _WeakMap = WeakMap$2;
var DataView = _DataView, Map$1 = _Map, Promise$1 = _Promise, Set$1 = _Set, WeakMap$1 = _WeakMap, baseGetTag$1 = _baseGetTag, toSource = _toSource;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag$3 = baseGetTag$1;
if (DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag$3(new Map$1()) != mapTag$3 || Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag || Set$1 && getTag$3(new Set$1()) != setTag$3 || WeakMap$1 && getTag$3(new WeakMap$1()) != weakMapTag$1) {
  getTag$3 = function(value) {
    var result = baseGetTag$1(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag$3;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var cloneArrayBuffer$1 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$1(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$2 = _Symbol;
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray = _cloneTypedArray;
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var getTag$2 = _getTag, isObjectLike$2 = isObjectLike_1;
var mapTag$1 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$2(value) && getTag$2(value) == mapTag$1;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$2 = _baseUnary, nodeUtil$1 = _nodeUtilExports;
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap$1 = nodeIsMap ? baseUnary$2(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$1 = _getTag, isObjectLike$1 = isObjectLike_1;
var setTag$1 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$1(value) && getTag$1(value) == setTag$1;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary$1 = _baseUnary, nodeUtil = _nodeUtilExports;
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet$1 = nodeIsSet ? baseUnary$1(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack = _Stack, arrayEach = _arrayEach, assignValue = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer = _cloneBufferExports, copyArray = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject = _initCloneObject, isArray$1 = isArray_1, isBuffer = isBufferExports, isMap = isMap_1, isObject$1 = isObject_1, isSet = isSet_1, keys = keys_1, keysIn = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props2 = isArr ? void 0 : keysFunc(value);
  arrayEach(props2 || value, function(subValue, key2) {
    if (props2) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var cloneDeep_1 = cloneDeep;
var globalState = {};
var deps = {};
function emitGlobal(state, prevState) {
  Object.keys(deps).forEach(function(id) {
    if (deps[id] instanceof Function) {
      deps[id](cloneDeep_1(state), cloneDeep_1(prevState));
    }
  });
}
function initGlobalState() {
  var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  if (process.env.NODE_ENV === "development") {
    console.warn("[qiankun] globalState tools will be removed in 3.0, pls don't use it!");
  }
  if (state === globalState) {
    console.warn("[qiankun] state has not changed！");
  } else {
    var prevGlobalState = cloneDeep_1(globalState);
    globalState = cloneDeep_1(state);
    emitGlobal(globalState, prevGlobalState);
  }
  return getMicroAppStateActions("global-".concat(+/* @__PURE__ */ new Date()), true);
}
function getMicroAppStateActions(id, isMaster) {
  return {
    /**
     * onGlobalStateChange 全局依赖监听
     *
     * 收集 setState 时所需要触发的依赖
     *
     * 限制条件：每个子应用只有一个激活状态的全局监听，新监听覆盖旧监听，若只是监听部分属性，请使用 onGlobalStateChange
     *
     * 这么设计是为了减少全局监听滥用导致的内存爆炸
     *
     * 依赖数据结构为：
     * {
     *   {id}: callback
     * }
     *
     * @param callback
     * @param fireImmediately
     */
    onGlobalStateChange: function onGlobalStateChange(callback, fireImmediately) {
      if (!(callback instanceof Function)) {
        console.error("[qiankun] callback must be function!");
        return;
      }
      if (deps[id]) {
        console.warn("[qiankun] '".concat(id, "' global listener already exists before this, new listener will overwrite it."));
      }
      deps[id] = callback;
      if (fireImmediately) {
        var cloneState = cloneDeep_1(globalState);
        callback(cloneState, cloneState);
      }
    },
    /**
     * setGlobalState 更新 store 数据
     *
     * 1. 对输入 state 的第一层属性做校验，只有初始化时声明过的第一层（bucket）属性才会被更改
     * 2. 修改 store 并触发全局监听
     *
     * @param state
     */
    setGlobalState: function setGlobalState() {
      var state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (state === globalState) {
        console.warn("[qiankun] state has not changed！");
        return false;
      }
      var changeKeys = [];
      var prevGlobalState = cloneDeep_1(globalState);
      globalState = cloneDeep_1(Object.keys(state).reduce(function(_globalState, changeKey) {
        if (isMaster || _globalState.hasOwnProperty(changeKey)) {
          changeKeys.push(changeKey);
          return Object.assign(_globalState, _defineProperty$1({}, changeKey, state[changeKey]));
        }
        console.warn("[qiankun] '".concat(changeKey, "' not declared when init state！"));
        return _globalState;
      }, globalState));
      if (changeKeys.length === 0) {
        console.warn("[qiankun] state has not changed！");
        return false;
      }
      emitGlobal(globalState, prevGlobalState);
      return true;
    },
    // 注销该应用下的依赖
    offGlobalStateChange: function offGlobalStateChange() {
      delete deps[id];
      return true;
    }
  };
}
exports.SandBoxType = void 0;
(function(SandBoxType) {
  SandBoxType["Proxy"] = "Proxy";
  SandBoxType["Snapshot"] = "Snapshot";
  SandBoxType["LegacyProxy"] = "LegacyProxy";
})(exports.SandBoxType || (exports.SandBoxType = {}));
var reWhitespace = /\s/;
function trimmedEndIndex$1(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var _trimmedEndIndex = trimmedEndIndex$1;
var trimmedEndIndex = _trimmedEndIndex;
var reTrimStart = /^\s+/;
function baseTrim$1(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var _baseTrim = baseTrim$1;
var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$2(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var isSymbol_1 = isSymbol$2;
var baseTrim = _baseTrim, isObject = isObject_1, isSymbol$1 = isSymbol_1;
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber$1(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol$1(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var toNumber_1 = toNumber$1;
var toNumber = toNumber_1;
var INFINITY$1 = 1 / 0, MAX_INTEGER = 17976931348623157e292;
function toFinite$1(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY$1 || value === -INFINITY$1) {
    var sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}
var toFinite_1 = toFinite$1;
var toFinite = toFinite_1;
function toInteger$1(value) {
  var result = toFinite(value), remainder = result % 1;
  return result === result ? remainder ? result - remainder : result : 0;
}
var toInteger_1 = toInteger$1;
var toInteger = toInteger_1;
var FUNC_ERROR_TEXT = "Expected a function";
function before$1(n2, func) {
  var result;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  n2 = toInteger(n2);
  return function() {
    if (--n2 > 0) {
      result = func.apply(this, arguments);
    }
    if (n2 <= 1) {
      func = void 0;
    }
    return result;
  };
}
var before_1 = before$1;
var before = before_1;
function once(func) {
  return before(2, func);
}
var once_1 = once;
function arrayReduce$1(array, iteratee, accumulator, initAccum) {
  var index = -1, length = array == null ? 0 : array.length;
  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce$1;
function basePropertyOf$1(object) {
  return function(key) {
    return object == null ? void 0 : object[key];
  };
}
var _basePropertyOf = basePropertyOf$1;
var basePropertyOf = _basePropertyOf;
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "s"
};
var deburrLetter$1 = basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter$1;
function arrayMap$2(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$2;
var Symbol$1 = _Symbol, arrayMap$1 = _arrayMap, isArray = isArray_1, isSymbol = isSymbol_1;
var INFINITY = 1 / 0;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    return arrayMap$1(value, baseToString$1) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$2(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$2;
var deburrLetter = _deburrLetter, toString$1 = toString_1;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange$1 = "\\u0300-\\u036f", reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f", rsComboSymbolsRange$1 = "\\u20d0-\\u20ff", rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var reComboMark = RegExp(rsCombo$1, "g");
function deburr$1(string) {
  string = toString$1(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var deburr_1 = deburr$1;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords$1(string) {
  return string.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords$1;
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord$1(string) {
  return reHasUnicodeWord.test(string);
}
var _hasUnicodeWord = hasUnicodeWord$1;
var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos$1 = "['’]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos$1 + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos$1 + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords$1(string) {
  return string.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords$1;
var asciiWords = _asciiWords, hasUnicodeWord = _hasUnicodeWord, toString = toString_1, unicodeWords = _unicodeWords;
function words$1(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}
var words_1 = words$1;
var arrayReduce = _arrayReduce, deburr = deburr_1, words = words_1;
var rsApos = "['’]";
var reApos = RegExp(rsApos, "g");
function createCompounder$1(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
  };
}
var _createCompounder = createCompounder$1;
var createCompounder = _createCompounder;
var snakeCase = createCompounder(function(result, word, index) {
  return result + (index ? "_" : "") + word.toLowerCase();
});
var snakeCase_1 = snakeCase;
var version = "2.10.3";
function toArray(array) {
  return Array.isArray(array) ? array : [array];
}
var nextTick = typeof window.Zone === "function" ? setTimeout : function(cb) {
  return Promise.resolve().then(cb);
};
var globalTaskPending = false;
function nextTask(cb) {
  if (!globalTaskPending) {
    globalTaskPending = true;
    nextTick(function() {
      cb();
      globalTaskPending = false;
    });
  }
}
var fnRegexCheckCacheMap = /* @__PURE__ */ new WeakMap();
function isConstructable(fn) {
  var hasPrototypeMethods = fn.prototype && fn.prototype.constructor === fn && Object.getOwnPropertyNames(fn.prototype).length > 1;
  if (hasPrototypeMethods)
    return true;
  if (fnRegexCheckCacheMap.has(fn)) {
    return fnRegexCheckCacheMap.get(fn);
  }
  var constructable = hasPrototypeMethods;
  if (!constructable) {
    var fnString = fn.toString();
    var constructableFunctionRegex = /^function\b\s[A-Z].*/;
    var classRegex = /^class\b/;
    constructable = constructableFunctionRegex.test(fnString) || classRegex.test(fnString);
  }
  fnRegexCheckCacheMap.set(fn, constructable);
  return constructable;
}
var naughtySafari = typeof document.all === "function" && typeof document.all === "undefined";
var callableFnCacheMap = /* @__PURE__ */ new WeakMap();
function isCallable(fn) {
  if (callableFnCacheMap.has(fn)) {
    return true;
  }
  var callable = naughtySafari ? typeof fn === "function" && typeof fn !== "undefined" : typeof fn === "function";
  if (callable) {
    callableFnCacheMap.set(fn, callable);
  }
  return callable;
}
var frozenPropertyCacheMap = /* @__PURE__ */ new WeakMap();
function isPropertyFrozen(target, p2) {
  if (!target || !p2) {
    return false;
  }
  var targetPropertiesFromCache = frozenPropertyCacheMap.get(target) || {};
  if (targetPropertiesFromCache[p2]) {
    return targetPropertiesFromCache[p2];
  }
  var propertyDescriptor = Object.getOwnPropertyDescriptor(target, p2);
  var frozen = Boolean(propertyDescriptor && propertyDescriptor.configurable === false && (propertyDescriptor.writable === false || propertyDescriptor.get && !propertyDescriptor.set));
  targetPropertiesFromCache[p2] = frozen;
  frozenPropertyCacheMap.set(target, targetPropertiesFromCache);
  return frozen;
}
var boundedMap = /* @__PURE__ */ new WeakMap();
function isBoundedFunction(fn) {
  if (boundedMap.has(fn)) {
    return boundedMap.get(fn);
  }
  var bounded = fn.name.indexOf("bound ") === 0 && !fn.hasOwnProperty("prototype");
  boundedMap.set(fn, bounded);
  return bounded;
}
var qiankunHeadTagName = "qiankun-head";
function getDefaultTplWrapper(name2, sandboxOpts) {
  return function(tpl) {
    var tplWithSimulatedHead;
    if (tpl.indexOf("<head>") !== -1) {
      tplWithSimulatedHead = tpl.replace("<head>", "<".concat(qiankunHeadTagName, ">")).replace("</head>", "</".concat(qiankunHeadTagName, ">"));
    } else {
      tplWithSimulatedHead = "<".concat(qiankunHeadTagName, "></").concat(qiankunHeadTagName, ">").concat(tpl);
    }
    return '<div id="'.concat(getWrapperId(name2), '" data-name="').concat(name2, '" data-version="').concat(version, '" data-sandbox-cfg=').concat(JSON.stringify(sandboxOpts), ">").concat(tplWithSimulatedHead, "</div>");
  };
}
function getWrapperId(name2) {
  return "__qiankun_microapp_wrapper_for_".concat(snakeCase_1(name2), "__");
}
var nativeGlobal = new Function("return this")();
var nativeDocument = new Function("return document")();
var getGlobalAppInstanceMap = once_1(function() {
  if (!nativeGlobal.hasOwnProperty("__app_instance_name_map__")) {
    Object.defineProperty(nativeGlobal, "__app_instance_name_map__", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: {}
    });
  }
  return nativeGlobal.__app_instance_name_map__;
});
var genAppInstanceIdByName = function genAppInstanceIdByName2(appName) {
  var globalAppInstanceMap = getGlobalAppInstanceMap();
  if (!(appName in globalAppInstanceMap)) {
    nativeGlobal.__app_instance_name_map__[appName] = 0;
    return appName;
  }
  globalAppInstanceMap[appName]++;
  return "".concat(appName, "_").concat(globalAppInstanceMap[appName]);
};
function validateExportLifecycle(exports2) {
  var _ref = exports2 !== null && exports2 !== void 0 ? exports2 : {}, bootstrap = _ref.bootstrap, mount = _ref.mount, unmount = _ref.unmount;
  return isFunction_1(bootstrap) && isFunction_1(mount) && isFunction_1(unmount);
}
var Deferred = /* @__PURE__ */ _createClass(function Deferred2() {
  var _this = this;
  _classCallCheck(this, Deferred2);
  this.promise = void 0;
  this.resolve = void 0;
  this.reject = void 0;
  this.promise = new Promise(function(resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  });
});
var supportsUserTiming = typeof performance !== "undefined" && typeof performance.mark === "function" && typeof performance.clearMarks === "function" && typeof performance.measure === "function" && typeof performance.clearMeasures === "function" && typeof performance.getEntriesByName === "function";
function performanceGetEntriesByName(markName, type) {
  var marks = null;
  if (supportsUserTiming) {
    marks = performance.getEntriesByName(markName, type);
  }
  return marks;
}
function performanceMark(markName) {
  if (supportsUserTiming) {
    performance.mark(markName);
  }
}
function performanceMeasure(measureName, markName) {
  if (supportsUserTiming && performance.getEntriesByName(markName, "mark").length) {
    performance.measure(measureName, markName);
    performance.clearMarks(markName);
    performance.clearMeasures(measureName);
  }
}
function isEnableScopedCSS(sandbox) {
  if (_typeof$1(sandbox) !== "object") {
    return false;
  }
  if (sandbox.strictStyleIsolation) {
    return false;
  }
  return !!sandbox.experimentalStyleIsolation;
}
function getXPathForElement(el, document2) {
  if (!document2.body.contains(el)) {
    return void 0;
  }
  var xpath = "";
  var pos;
  var tmpEle;
  var element = el;
  while (element !== document2.documentElement) {
    pos = 0;
    tmpEle = element;
    while (tmpEle) {
      if (tmpEle.nodeType === 1 && tmpEle.nodeName === element.nodeName) {
        pos += 1;
      }
      tmpEle = tmpEle.previousSibling;
    }
    xpath = "*[name()='".concat(element.nodeName, "'][").concat(pos, "]/").concat(xpath);
    element = element.parentNode;
  }
  xpath = "/*[name()='".concat(document2.documentElement.nodeName, "']/").concat(xpath);
  xpath = xpath.replace(/\/$/, "");
  return xpath;
}
function getContainer(container) {
  return typeof container === "string" ? document.querySelector(container) : container;
}
function getContainerXPath(container) {
  if (container) {
    var containerElement = getContainer(container);
    if (containerElement) {
      return getXPathForElement(containerElement, document);
    }
  }
  return void 0;
}
var currentRunningApp = null;
function getCurrentRunningApp() {
  return currentRunningApp;
}
function setCurrentRunningApp(appInstance) {
  currentRunningApp = appInstance;
}
function clearCurrentRunningApp() {
  currentRunningApp = null;
}
var functionBoundedValueMap = /* @__PURE__ */ new WeakMap();
function getTargetValue(target, _value) {
  if (isCallable(_value) && !isBoundedFunction(_value) && !isConstructable(_value)) {
    var cachedBoundFunction = functionBoundedValueMap.get(_value);
    if (cachedBoundFunction) {
      return cachedBoundFunction;
    }
    var boundValue = Function.prototype.bind.call(_value, target);
    for (var key in _value) {
      boundValue[key] = _value[key];
    }
    if (_value.hasOwnProperty("prototype") && !boundValue.hasOwnProperty("prototype")) {
      Object.defineProperty(boundValue, "prototype", {
        value: _value.prototype,
        enumerable: false,
        writable: true
      });
    }
    if (typeof _value.toString === "function") {
      var valueHasInstanceToString = _value.hasOwnProperty("toString") && !boundValue.hasOwnProperty("toString");
      var boundValueHasPrototypeToString = boundValue.toString === Function.prototype.toString;
      if (valueHasInstanceToString || boundValueHasPrototypeToString) {
        var originToStringDescriptor = Object.getOwnPropertyDescriptor(valueHasInstanceToString ? _value : Function.prototype, "toString");
        Object.defineProperty(boundValue, "toString", _objectSpread2(_objectSpread2({}, originToStringDescriptor), (originToStringDescriptor === null || originToStringDescriptor === void 0 ? void 0 : originToStringDescriptor.get) ? null : {
          value: function value() {
            return _value.toString();
          }
        }));
      }
    }
    functionBoundedValueMap.set(_value, boundValue);
    return boundValue;
  }
  return _value;
}
function isPropConfigurable(target, prop) {
  var descriptor = Object.getOwnPropertyDescriptor(target, prop);
  return descriptor ? descriptor.configurable : true;
}
var LegacySandbox = /* @__PURE__ */ function() {
  function LegacySandbox2(name2) {
    var _this = this;
    var globalContext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    _classCallCheck(this, LegacySandbox2);
    this.addedPropsMapInSandbox = /* @__PURE__ */ new Map();
    this.modifiedPropsOriginalValueMapInSandbox = /* @__PURE__ */ new Map();
    this.currentUpdatedPropsValueMap = /* @__PURE__ */ new Map();
    this.name = void 0;
    this.proxy = void 0;
    this.globalContext = void 0;
    this.type = void 0;
    this.sandboxRunning = true;
    this.latestSetProp = null;
    this.name = name2;
    this.globalContext = globalContext;
    this.type = exports.SandBoxType.LegacyProxy;
    var addedPropsMapInSandbox = this.addedPropsMapInSandbox, modifiedPropsOriginalValueMapInSandbox = this.modifiedPropsOriginalValueMapInSandbox, currentUpdatedPropsValueMap = this.currentUpdatedPropsValueMap;
    var rawWindow = globalContext;
    var fakeWindow = /* @__PURE__ */ Object.create(null);
    var setTrap = function setTrap2(p2, value, originalValue) {
      var sync2Window = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
      if (_this.sandboxRunning) {
        if (!rawWindow.hasOwnProperty(p2)) {
          addedPropsMapInSandbox.set(p2, value);
        } else if (!modifiedPropsOriginalValueMapInSandbox.has(p2)) {
          modifiedPropsOriginalValueMapInSandbox.set(p2, originalValue);
        }
        currentUpdatedPropsValueMap.set(p2, value);
        if (sync2Window) {
          rawWindow[p2] = value;
        }
        _this.latestSetProp = p2;
        return true;
      }
      if (process.env.NODE_ENV === "development") {
        console.warn("[qiankun] Set window.".concat(p2.toString(), " while sandbox destroyed or inactive in ").concat(name2, "!"));
      }
      return true;
    };
    var proxy = new Proxy(fakeWindow, {
      set: function set(_2, p2, value) {
        var originalValue = rawWindow[p2];
        return setTrap(p2, value, originalValue, true);
      },
      get: function get(_2, p2) {
        if (p2 === "top" || p2 === "parent" || p2 === "window" || p2 === "self") {
          return proxy;
        }
        var value = rawWindow[p2];
        return getTargetValue(rawWindow, value);
      },
      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has: function has(_2, p2) {
        return p2 in rawWindow;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(_2, p2) {
        var descriptor = Object.getOwnPropertyDescriptor(rawWindow, p2);
        if (descriptor && !descriptor.configurable) {
          descriptor.configurable = true;
        }
        return descriptor;
      },
      defineProperty: function defineProperty2(_2, p2, attributes) {
        var originalValue = rawWindow[p2];
        var done = Reflect.defineProperty(rawWindow, p2, attributes);
        var value = rawWindow[p2];
        setTrap(p2, value, originalValue, false);
        return done;
      }
    });
    this.proxy = proxy;
  }
  _createClass(LegacySandbox2, [{
    key: "setWindowProp",
    value: function setWindowProp(prop, value, toDelete) {
      if (value === void 0 && toDelete) {
        delete this.globalContext[prop];
      } else if (isPropConfigurable(this.globalContext, prop) && _typeof$1(prop) !== "symbol") {
        Object.defineProperty(this.globalContext, prop, {
          writable: true,
          configurable: true
        });
        this.globalContext[prop] = value;
      }
    }
  }, {
    key: "active",
    value: function active() {
      var _this2 = this;
      if (!this.sandboxRunning) {
        this.currentUpdatedPropsValueMap.forEach(function(v2, p2) {
          return _this2.setWindowProp(p2, v2);
        });
      }
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this3 = this;
      if (process.env.NODE_ENV === "development") {
        console.info("[qiankun:sandbox] ".concat(this.name, " modified global properties restore..."), [].concat(_toConsumableArray(this.addedPropsMapInSandbox.keys()), _toConsumableArray(this.modifiedPropsOriginalValueMapInSandbox.keys())));
      }
      this.modifiedPropsOriginalValueMapInSandbox.forEach(function(v2, p2) {
        return _this3.setWindowProp(p2, v2);
      });
      this.addedPropsMapInSandbox.forEach(function(_2, p2) {
        return _this3.setWindowProp(p2, void 0, true);
      });
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2() {
    }
  }]);
  return LegacySandbox2;
}();
var RuleType;
(function(RuleType2) {
  RuleType2[RuleType2["STYLE"] = 1] = "STYLE";
  RuleType2[RuleType2["MEDIA"] = 4] = "MEDIA";
  RuleType2[RuleType2["SUPPORTS"] = 12] = "SUPPORTS";
  RuleType2[RuleType2["IMPORT"] = 3] = "IMPORT";
  RuleType2[RuleType2["FONT_FACE"] = 5] = "FONT_FACE";
  RuleType2[RuleType2["PAGE"] = 6] = "PAGE";
  RuleType2[RuleType2["KEYFRAMES"] = 7] = "KEYFRAMES";
  RuleType2[RuleType2["KEYFRAME"] = 8] = "KEYFRAME";
})(RuleType || (RuleType = {}));
var arrayify = function arrayify2(list) {
  return [].slice.call(list, 0);
};
var rawDocumentBodyAppend = HTMLBodyElement.prototype.appendChild;
var ScopedCSS = /* @__PURE__ */ function() {
  function ScopedCSS2() {
    _classCallCheck(this, ScopedCSS2);
    this.sheet = void 0;
    this.swapNode = void 0;
    var styleNode = document.createElement("style");
    rawDocumentBodyAppend.call(document.body, styleNode);
    this.swapNode = styleNode;
    this.sheet = styleNode.sheet;
    this.sheet.disabled = true;
  }
  _createClass(ScopedCSS2, [{
    key: "process",
    value: function process3(styleNode) {
      var _this = this;
      var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      if (ScopedCSS2.ModifiedTag in styleNode) {
        return;
      }
      if (styleNode.textContent !== "") {
        var _sheet$cssRules;
        var textNode = document.createTextNode(styleNode.textContent || "");
        this.swapNode.appendChild(textNode);
        var sheet = this.swapNode.sheet;
        var rules = arrayify((_sheet$cssRules = sheet === null || sheet === void 0 ? void 0 : sheet.cssRules) !== null && _sheet$cssRules !== void 0 ? _sheet$cssRules : []);
        var css = this.rewrite(rules, prefix);
        styleNode.textContent = css;
        this.swapNode.removeChild(textNode);
        styleNode[ScopedCSS2.ModifiedTag] = true;
        return;
      }
      var mutator = new MutationObserver(function(mutations) {
        for (var i2 = 0; i2 < mutations.length; i2 += 1) {
          var mutation = mutations[i2];
          if (ScopedCSS2.ModifiedTag in styleNode) {
            return;
          }
          if (mutation.type === "childList") {
            var _sheet$cssRules2;
            var _sheet = styleNode.sheet;
            var _rules = arrayify((_sheet$cssRules2 = _sheet === null || _sheet === void 0 ? void 0 : _sheet.cssRules) !== null && _sheet$cssRules2 !== void 0 ? _sheet$cssRules2 : []);
            var _css = _this.rewrite(_rules, prefix);
            styleNode.textContent = _css;
            styleNode[ScopedCSS2.ModifiedTag] = true;
          }
        }
      });
      mutator.observe(styleNode, {
        childList: true
      });
    }
  }, {
    key: "rewrite",
    value: function rewrite(rules) {
      var _this2 = this;
      var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var css = "";
      rules.forEach(function(rule) {
        switch (rule.type) {
          case RuleType.STYLE:
            css += _this2.ruleStyle(rule, prefix);
            break;
          case RuleType.MEDIA:
            css += _this2.ruleMedia(rule, prefix);
            break;
          case RuleType.SUPPORTS:
            css += _this2.ruleSupport(rule, prefix);
            break;
          default:
            css += "".concat(rule.cssText);
            break;
        }
      });
      return css;
    }
    // handle case:
    // .app-main {}
    // html, body {}
    // eslint-disable-next-line class-methods-use-this
  }, {
    key: "ruleStyle",
    value: function ruleStyle(rule, prefix) {
      var rootSelectorRE = /((?:[^\w\-.#]|^)(body|html|:root))/gm;
      var rootCombinationRE = /(html[^\w{[]+)/gm;
      var selector = rule.selectorText.trim();
      var cssText = rule.cssText;
      if (selector === "html" || selector === "body" || selector === ":root") {
        return cssText.replace(rootSelectorRE, prefix);
      }
      if (rootCombinationRE.test(rule.selectorText)) {
        var siblingSelectorRE = /(html[^\w{]+)(\+|~)/gm;
        if (!siblingSelectorRE.test(rule.selectorText)) {
          cssText = cssText.replace(rootCombinationRE, "");
        }
      }
      cssText = cssText.replace(/^[\s\S]+{/, function(selectors) {
        return selectors.replace(/(^|,\n?)([^,]+)/g, function(item, p2, s2) {
          if (rootSelectorRE.test(item)) {
            return item.replace(rootSelectorRE, function(m2) {
              var whitePrevChars = [",", "("];
              if (m2 && whitePrevChars.includes(m2[0])) {
                return "".concat(m2[0]).concat(prefix);
              }
              return prefix;
            });
          }
          return "".concat(p2).concat(prefix, " ").concat(s2.replace(/^ */, ""));
        });
      });
      return cssText;
    }
    // handle case:
    // @media screen and (max-width: 300px) {}
  }, {
    key: "ruleMedia",
    value: function ruleMedia(rule, prefix) {
      var css = this.rewrite(arrayify(rule.cssRules), prefix);
      return "@media ".concat(rule.conditionText || rule.media.mediaText, " {").concat(css, "}");
    }
    // handle case:
    // @supports (display: grid) {}
  }, {
    key: "ruleSupport",
    value: function ruleSupport(rule, prefix) {
      var css = this.rewrite(arrayify(rule.cssRules), prefix);
      return "@supports ".concat(rule.conditionText || rule.cssText.split("{")[0], " {").concat(css, "}");
    }
  }]);
  return ScopedCSS2;
}();
ScopedCSS.ModifiedTag = "Symbol(style-modified-qiankun)";
var processor;
var QiankunCSSRewriteAttr = "data-qiankun";
var process$1 = function process2(appWrapper, stylesheetElement, appName) {
  if (!processor) {
    processor = new ScopedCSS();
  }
  if (stylesheetElement.tagName === "LINK") {
    console.warn("Feature: sandbox.experimentalStyleIsolation is not support for link element yet.");
  }
  var mountDOM = appWrapper;
  if (!mountDOM) {
    return;
  }
  var tag = (mountDOM.tagName || "").toLowerCase();
  if (tag && stylesheetElement.tagName === "STYLE") {
    var prefix = "".concat(tag, "[").concat(QiankunCSSRewriteAttr, '="').concat(appName, '"]');
    processor.process(stylesheetElement, prefix);
  }
};
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd$1(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
var _setCacheAdd = setCacheAdd$1;
function setCacheHas$1(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$1;
var MapCache = _MapCache, setCacheAdd = _setCacheAdd, setCacheHas = _setCacheHas;
function SetCache$1(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache$1.prototype.add = SetCache$1.prototype.push = setCacheAdd;
SetCache$1.prototype.has = setCacheHas;
var _SetCache = SetCache$1;
function baseFindIndex$1(array, predicate, fromIndex, fromRight) {
  var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}
var _baseFindIndex = baseFindIndex$1;
function baseIsNaN$1(value) {
  return value !== value;
}
var _baseIsNaN = baseIsNaN$1;
function strictIndexOf$1(array, value, fromIndex) {
  var index = fromIndex - 1, length = array.length;
  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}
var _strictIndexOf = strictIndexOf$1;
var baseFindIndex = _baseFindIndex, baseIsNaN = _baseIsNaN, strictIndexOf = _strictIndexOf;
function baseIndexOf$1(array, value, fromIndex) {
  return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
}
var _baseIndexOf = baseIndexOf$1;
var baseIndexOf = _baseIndexOf;
function arrayIncludes$1(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}
var _arrayIncludes = arrayIncludes$1;
function arrayIncludesWith$1(array, value, comparator) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}
var _arrayIncludesWith = arrayIncludesWith$1;
function cacheHas$1(cache, key) {
  return cache.has(key);
}
var _cacheHas = cacheHas$1;
var SetCache = _SetCache, arrayIncludes = _arrayIncludes, arrayIncludesWith = _arrayIncludesWith, arrayMap = _arrayMap, baseUnary = _baseUnary, cacheHas = _cacheHas;
var LARGE_ARRAY_SIZE = 200;
function baseDifference$1(array, values, iteratee, comparator) {
  var index = -1, includes = arrayIncludes, isCommon = true, length = array.length, result = [], valuesLength = values.length;
  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  } else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
    while (++index < length) {
      var value = array[index], computed = iteratee == null ? value : iteratee(value);
      value = comparator || value !== 0 ? value : 0;
      if (isCommon && computed === computed) {
        var valuesIndex = valuesLength;
        while (valuesIndex--) {
          if (values[valuesIndex] === computed) {
            continue outer;
          }
        }
        result.push(value);
      } else if (!includes(values, computed, comparator)) {
        result.push(value);
      }
    }
  return result;
}
var _baseDifference = baseDifference$1;
var baseDifference = _baseDifference, baseRest = _baseRest, isArrayLikeObject = isArrayLikeObject_1;
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array) ? baseDifference(array, values) : [];
});
var without_1 = without;
var globals = window.Proxy ? ["Array", "ArrayBuffer", "Boolean", "constructor", "DataView", "Date", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Error", "escape", "eval", "EvalError", "Float32Array", "Float64Array", "Function", "hasOwnProperty", "Infinity", "Int16Array", "Int32Array", "Int8Array", "isFinite", "isNaN", "isPrototypeOf", "JSON", "Map", "Math", "NaN", "Number", "Object", "parseFloat", "parseInt", "Promise", "propertyIsEnumerable", "Proxy", "RangeError", "ReferenceError", "Reflect", "RegExp", "Set", "String", "Symbol", "SyntaxError", "toLocaleString", "toString", "TypeError", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "undefined", "unescape", "URIError", "valueOf", "WeakMap", "WeakSet"].filter(function(p2) {
  return (
    /* just keep the available properties in current window context */
    p2 in window
  );
}) : [];
function uniq(array) {
  return array.filter(function filter(element) {
    return element in this ? false : this[element] = true;
  }, /* @__PURE__ */ Object.create(null));
}
var rawObjectDefineProperty = Object.defineProperty;
var variableWhiteListInDev = process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development" || window.__QIANKUN_DEVELOPMENT__ ? [
  // for react hot reload
  // see https://github.com/facebook/create-react-app/blob/66bf7dfc43350249e2f09d138a20840dae8a0a4a/packages/react-error-overlay/src/index.js#L180
  "__REACT_ERROR_OVERLAY_GLOBAL_HOOK__"
] : [];
var globalVariableWhiteList = [
  // FIXME System.js used a indirect call with eval, which would make it scope escape to global
  // To make System.js works well, we write it back to global window temporary
  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/evaluate.js#L106
  "System",
  // see https://github.com/systemjs/systemjs/blob/457f5b7e8af6bd120a279540477552a07d5de086/src/instantiate.js#L357
  "__cjsWrapper"
].concat(variableWhiteListInDev);
var inTest = process.env.NODE_ENV === "test";
var mockSafariTop = "mockSafariTop";
var mockTop = "mockTop";
var mockGlobalThis = "mockGlobalThis";
var accessingSpiedGlobals = ["document", "top", "parent", "eval"];
var overwrittenGlobals = ["window", "self", "globalThis"].concat(inTest ? [mockGlobalThis] : []);
var cachedGlobals = Array.from(new Set(without_1.apply(void 0, [[].concat(_toConsumableArray(globals), _toConsumableArray(overwrittenGlobals), ["requestAnimationFrame"])].concat(accessingSpiedGlobals))));
var cachedGlobalObjects = cachedGlobals.reduce(function(acc, globalProp) {
  return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty$1({}, globalProp, true));
}, {});
var unscopables = without_1.apply(void 0, [cachedGlobals].concat(_toConsumableArray(overwrittenGlobals))).reduce(
  // Notes that babel will transpile spread operator to Object.assign({}, ...args), which will keep the prototype of Object in merged object,
  // while this result used as Symbol.unscopables, it will make properties in Object.prototype always be escaped from proxy sandbox as unscopables check will look up prototype chain as well,
  // such as hasOwnProperty, toString, valueOf, etc.
  function(acc, key) {
    return _objectSpread2(_objectSpread2({}, acc), {}, _defineProperty$1({}, key, true));
  },
  {}
);
var useNativeWindowForBindingsProps = /* @__PURE__ */ new Map([["fetch", true], ["mockDomAPIInBlackList", process.env.NODE_ENV === "test"]]);
function createFakeWindow(globalContext, speedy) {
  var propertiesWithGetter = /* @__PURE__ */ new Map();
  var fakeWindow = {};
  Object.getOwnPropertyNames(globalContext).filter(function(p2) {
    var descriptor = Object.getOwnPropertyDescriptor(globalContext, p2);
    return !(descriptor === null || descriptor === void 0 ? void 0 : descriptor.configurable);
  }).forEach(function(p2) {
    var descriptor = Object.getOwnPropertyDescriptor(globalContext, p2);
    if (descriptor) {
      var hasGetter = Object.prototype.hasOwnProperty.call(descriptor, "get");
      if (p2 === "top" || p2 === "parent" || p2 === "self" || p2 === "window" || // window.document is overwriting in speedy mode
      p2 === "document" && speedy || inTest && (p2 === mockTop || p2 === mockSafariTop)) {
        descriptor.configurable = true;
        if (!hasGetter) {
          descriptor.writable = true;
        }
      }
      if (hasGetter)
        propertiesWithGetter.set(p2, true);
      rawObjectDefineProperty(fakeWindow, p2, Object.freeze(descriptor));
    }
  });
  return {
    fakeWindow,
    propertiesWithGetter
  };
}
var activeSandboxCount = 0;
var ProxySandbox = /* @__PURE__ */ function() {
  function ProxySandbox2(name2) {
    var _this = this;
    var globalContext = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : window;
    var opts = arguments.length > 2 ? arguments[2] : void 0;
    _classCallCheck(this, ProxySandbox2);
    this.updatedValueSet = /* @__PURE__ */ new Set();
    this.name = void 0;
    this.type = void 0;
    this.proxy = void 0;
    this.sandboxRunning = true;
    this.document = document;
    this.latestSetProp = null;
    this.globalWhitelistPrevDescriptor = {};
    this.globalContext = void 0;
    this.name = name2;
    this.globalContext = globalContext;
    this.type = exports.SandBoxType.Proxy;
    var updatedValueSet = this.updatedValueSet;
    var _ref = opts || {}, speedy = _ref.speedy;
    var _createFakeWindow = createFakeWindow(globalContext, !!speedy), fakeWindow = _createFakeWindow.fakeWindow, propertiesWithGetter = _createFakeWindow.propertiesWithGetter;
    var descriptorTargetMap = /* @__PURE__ */ new Map();
    var hasOwnProperty2 = function hasOwnProperty3(key) {
      return fakeWindow.hasOwnProperty(key) || globalContext.hasOwnProperty(key);
    };
    var proxy = new Proxy(fakeWindow, {
      set: function set(target, p2, value) {
        if (_this.sandboxRunning) {
          _this.registerRunningApp(name2, proxy);
          if (!target.hasOwnProperty(p2) && globalContext.hasOwnProperty(p2)) {
            var descriptor = Object.getOwnPropertyDescriptor(globalContext, p2);
            var writable = descriptor.writable, configurable = descriptor.configurable, enumerable = descriptor.enumerable, set2 = descriptor.set;
            if (writable || set2) {
              Object.defineProperty(target, p2, {
                configurable,
                enumerable,
                writable: true,
                value
              });
            }
          } else {
            target[p2] = value;
          }
          if (typeof p2 === "string" && globalVariableWhiteList.indexOf(p2) !== -1) {
            _this.globalWhitelistPrevDescriptor[p2] = Object.getOwnPropertyDescriptor(globalContext, p2);
            globalContext[p2] = value;
          }
          updatedValueSet.add(p2);
          _this.latestSetProp = p2;
          return true;
        }
        if (process.env.NODE_ENV === "development") {
          console.warn("[qiankun] Set window.".concat(p2.toString(), " while sandbox destroyed or inactive in ").concat(name2, "!"));
        }
        return true;
      },
      get: function get(target, p2) {
        _this.registerRunningApp(name2, proxy);
        if (p2 === Symbol.unscopables)
          return unscopables;
        if (p2 === "window" || p2 === "self") {
          return proxy;
        }
        if (p2 === "globalThis" || inTest && p2 === mockGlobalThis) {
          return proxy;
        }
        if (p2 === "top" || p2 === "parent" || inTest && (p2 === mockTop || p2 === mockSafariTop)) {
          if (globalContext === globalContext.parent) {
            return proxy;
          }
          return globalContext[p2];
        }
        if (p2 === "hasOwnProperty") {
          return hasOwnProperty2;
        }
        if (p2 === "document") {
          return _this.document;
        }
        if (p2 === "eval") {
          return eval;
        }
        var actualTarget = propertiesWithGetter.has(p2) ? globalContext : p2 in target ? target : globalContext;
        var value = actualTarget[p2];
        if (isPropertyFrozen(actualTarget, p2)) {
          return value;
        }
        var boundTarget = useNativeWindowForBindingsProps.get(p2) ? nativeGlobal : globalContext;
        return getTargetValue(boundTarget, value);
      },
      // trap in operator
      // see https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/constants.js#L12
      has: function has(target, p2) {
        return p2 in cachedGlobalObjects || p2 in target || p2 in globalContext;
      },
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, p2) {
        if (target.hasOwnProperty(p2)) {
          var descriptor = Object.getOwnPropertyDescriptor(target, p2);
          descriptorTargetMap.set(p2, "target");
          return descriptor;
        }
        if (globalContext.hasOwnProperty(p2)) {
          var _descriptor = Object.getOwnPropertyDescriptor(globalContext, p2);
          descriptorTargetMap.set(p2, "globalContext");
          if (_descriptor && !_descriptor.configurable) {
            _descriptor.configurable = true;
          }
          return _descriptor;
        }
        return void 0;
      },
      // trap to support iterator with sandbox
      ownKeys: function ownKeys2(target) {
        return uniq(Reflect.ownKeys(globalContext).concat(Reflect.ownKeys(target)));
      },
      defineProperty: function defineProperty2(target, p2, attributes) {
        var from = descriptorTargetMap.get(p2);
        switch (from) {
          case "globalContext":
            return Reflect.defineProperty(globalContext, p2, attributes);
          default:
            return Reflect.defineProperty(target, p2, attributes);
        }
      },
      deleteProperty: function deleteProperty(target, p2) {
        _this.registerRunningApp(name2, proxy);
        if (target.hasOwnProperty(p2)) {
          delete target[p2];
          updatedValueSet.delete(p2);
          return true;
        }
        return true;
      },
      // makes sure `window instanceof Window` returns truthy in micro app
      getPrototypeOf: function getPrototypeOf() {
        return Reflect.getPrototypeOf(globalContext);
      }
    });
    this.proxy = proxy;
    activeSandboxCount++;
  }
  _createClass(ProxySandbox2, [{
    key: "active",
    value: function active() {
      if (!this.sandboxRunning)
        activeSandboxCount++;
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this2 = this;
      if (process.env.NODE_ENV === "development") {
        console.info("[qiankun:sandbox] ".concat(this.name, " modified global properties restore..."), _toConsumableArray(this.updatedValueSet.keys()));
      }
      if (inTest || --activeSandboxCount === 0) {
        Object.keys(this.globalWhitelistPrevDescriptor).forEach(function(p2) {
          var descriptor = _this2.globalWhitelistPrevDescriptor[p2];
          if (descriptor) {
            Object.defineProperty(_this2.globalContext, p2, descriptor);
          } else {
            delete _this2.globalContext[p2];
          }
        });
      }
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2(doc) {
      this.document = doc;
    }
  }, {
    key: "registerRunningApp",
    value: function registerRunningApp(name2, proxy) {
      if (this.sandboxRunning) {
        var currentRunningApp2 = getCurrentRunningApp();
        if (!currentRunningApp2 || currentRunningApp2.name !== name2) {
          setCurrentRunningApp({
            name: name2,
            window: proxy
          });
        }
        nextTask(clearCurrentRunningApp);
      }
    }
  }]);
  return ProxySandbox2;
}();
var rawHeadAppendChild = HTMLHeadElement.prototype.appendChild;
var rawHeadRemoveChild = HTMLHeadElement.prototype.removeChild;
var rawBodyAppendChild = HTMLBodyElement.prototype.appendChild;
var rawBodyRemoveChild = HTMLBodyElement.prototype.removeChild;
var rawHeadInsertBefore = HTMLHeadElement.prototype.insertBefore;
var rawRemoveChild$1 = HTMLElement.prototype.removeChild;
var SCRIPT_TAG_NAME = "SCRIPT";
var LINK_TAG_NAME = "LINK";
var STYLE_TAG_NAME = "STYLE";
var styleElementTargetSymbol = Symbol("target");
var getAppWrapperHeadElement = function getAppWrapperHeadElement2(appWrapper) {
  return appWrapper.querySelector(qiankunHeadTagName);
};
function isExecutableScriptType(script) {
  return !script.type || ["text/javascript", "module", "application/javascript", "text/ecmascript", "application/ecmascript"].indexOf(script.type) !== -1;
}
function isHijackingTag(tagName) {
  return (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === LINK_TAG_NAME || (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === STYLE_TAG_NAME || (tagName === null || tagName === void 0 ? void 0 : tagName.toUpperCase()) === SCRIPT_TAG_NAME;
}
function isStyledComponentsLike(element) {
  var _element$sheet, _getStyledElementCSSR;
  return !element.textContent && (((_element$sheet = element.sheet) === null || _element$sheet === void 0 ? void 0 : _element$sheet.cssRules.length) || ((_getStyledElementCSSR = getStyledElementCSSRules(element)) === null || _getStyledElementCSSR === void 0 ? void 0 : _getStyledElementCSSR.length));
}
var appsCounterMap = /* @__PURE__ */ new Map();
function calcAppCount(appName, calcType, status) {
  var appCount = appsCounterMap.get(appName) || {
    bootstrappingPatchCount: 0,
    mountingPatchCount: 0
  };
  switch (calcType) {
    case "increase":
      appCount["".concat(status, "PatchCount")] += 1;
      break;
    case "decrease":
      if (appCount["".concat(status, "PatchCount")] > 0) {
        appCount["".concat(status, "PatchCount")] -= 1;
      }
      break;
  }
  appsCounterMap.set(appName, appCount);
}
function isAllAppsUnmounted() {
  return Array.from(appsCounterMap.entries()).every(function(_ref) {
    var _ref2 = _slicedToArray(_ref, 2), _ref2$ = _ref2[1], bpc = _ref2$.bootstrappingPatchCount, mpc = _ref2$.mountingPatchCount;
    return bpc === 0 && mpc === 0;
  });
}
function patchCustomEvent(e2, elementGetter) {
  Object.defineProperties(e2, {
    srcElement: {
      get: elementGetter
    },
    target: {
      get: elementGetter
    }
  });
  return e2;
}
function manualInvokeElementOnLoad(element) {
  var loadEvent = new CustomEvent("load");
  var patchedEvent = patchCustomEvent(loadEvent, function() {
    return element;
  });
  if (isFunction_1(element.onload)) {
    element.onload(patchedEvent);
  } else {
    element.dispatchEvent(patchedEvent);
  }
}
function manualInvokeElementOnError(element) {
  var errorEvent = new CustomEvent("error");
  var patchedEvent = patchCustomEvent(errorEvent, function() {
    return element;
  });
  if (isFunction_1(element.onerror)) {
    element.onerror(patchedEvent);
  } else {
    element.dispatchEvent(patchedEvent);
  }
}
function convertLinkAsStyle(element, postProcess) {
  var fetchFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : fetch;
  var styleElement = document.createElement("style");
  var href = element.href;
  styleElement.dataset.qiankunHref = href;
  fetchFn(href).then(function(res) {
    return res.text();
  }).then(function(styleContext) {
    styleElement.appendChild(document.createTextNode(styleContext));
    postProcess(styleElement);
    manualInvokeElementOnLoad(element);
  }).catch(function() {
    return manualInvokeElementOnError(element);
  });
  return styleElement;
}
var styledComponentCSSRulesMap = /* @__PURE__ */ new WeakMap();
var dynamicScriptAttachedCommentMap = /* @__PURE__ */ new WeakMap();
var dynamicLinkAttachedInlineStyleMap = /* @__PURE__ */ new WeakMap();
function recordStyledComponentsCSSRules(styleElements) {
  styleElements.forEach(function(styleElement) {
    if (styleElement instanceof HTMLStyleElement && isStyledComponentsLike(styleElement)) {
      if (styleElement.sheet) {
        styledComponentCSSRulesMap.set(styleElement, styleElement.sheet.cssRules);
      }
    }
  });
}
function getStyledElementCSSRules(styledElement) {
  return styledComponentCSSRulesMap.get(styledElement);
}
function getOverwrittenAppendChildOrInsertBefore(opts) {
  return function appendChildOrInsertBefore(newChild) {
    var refChild = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    var element = newChild;
    var rawDOMAppendOrInsertBefore = opts.rawDOMAppendOrInsertBefore, isInvokedByMicroApp = opts.isInvokedByMicroApp, containerConfigGetter = opts.containerConfigGetter, _opts$target = opts.target, target = _opts$target === void 0 ? "body" : _opts$target;
    if (!isHijackingTag(element.tagName) || !isInvokedByMicroApp(element)) {
      return rawDOMAppendOrInsertBefore.call(this, element, refChild);
    }
    if (element.tagName) {
      var containerConfig = containerConfigGetter(element);
      var appName = containerConfig.appName, appWrapperGetter = containerConfig.appWrapperGetter, proxy = containerConfig.proxy, strictGlobal = containerConfig.strictGlobal, speedySandbox = containerConfig.speedySandbox, dynamicStyleSheetElements = containerConfig.dynamicStyleSheetElements, scopedCSS = containerConfig.scopedCSS, excludeAssetFilter = containerConfig.excludeAssetFilter;
      switch (element.tagName) {
        case LINK_TAG_NAME:
        case STYLE_TAG_NAME: {
          var stylesheetElement = newChild;
          var _stylesheetElement = stylesheetElement, href = _stylesheetElement.href;
          if (excludeAssetFilter && href && excludeAssetFilter(href)) {
            return rawDOMAppendOrInsertBefore.call(this, element, refChild);
          }
          Object.defineProperty(stylesheetElement, styleElementTargetSymbol, {
            value: target,
            writable: true,
            configurable: true
          });
          var appWrapper = appWrapperGetter();
          if (scopedCSS) {
            var _element$tagName;
            var linkElementUsingStylesheet = ((_element$tagName = element.tagName) === null || _element$tagName === void 0 ? void 0 : _element$tagName.toUpperCase()) === LINK_TAG_NAME && element.rel === "stylesheet" && element.href;
            if (linkElementUsingStylesheet) {
              var _frameworkConfigurati;
              var _fetch = typeof frameworkConfiguration.fetch === "function" ? frameworkConfiguration.fetch : (_frameworkConfigurati = frameworkConfiguration.fetch) === null || _frameworkConfigurati === void 0 ? void 0 : _frameworkConfigurati.fn;
              stylesheetElement = convertLinkAsStyle(element, function(styleElement) {
                return process$1(appWrapper, styleElement, appName);
              }, _fetch);
              dynamicLinkAttachedInlineStyleMap.set(element, stylesheetElement);
            } else {
              process$1(appWrapper, stylesheetElement, appName);
            }
          }
          var mountDOM = target === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
          dynamicStyleSheetElements.push(stylesheetElement);
          var referenceNode = mountDOM.contains(refChild) ? refChild : null;
          return rawDOMAppendOrInsertBefore.call(mountDOM, stylesheetElement, referenceNode);
        }
        case SCRIPT_TAG_NAME: {
          var _element = element, src = _element.src, text = _element.text;
          if (excludeAssetFilter && src && excludeAssetFilter(src) || !isExecutableScriptType(element)) {
            return rawDOMAppendOrInsertBefore.call(this, element, refChild);
          }
          var _appWrapper = appWrapperGetter();
          var _mountDOM = target === "head" ? getAppWrapperHeadElement(_appWrapper) : _appWrapper;
          var _fetch2 = frameworkConfiguration.fetch;
          var _referenceNode = _mountDOM.contains(refChild) ? refChild : null;
          var scopedGlobalVariables = speedySandbox ? cachedGlobals : [];
          if (src) {
            var isRedfinedCurrentScript = false;
            _execScripts(null, [src], proxy, {
              fetch: _fetch2,
              strictGlobal,
              scopedGlobalVariables,
              beforeExec: function beforeExec() {
                var isCurrentScriptConfigurable = function isCurrentScriptConfigurable2() {
                  var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
                  return !descriptor || descriptor.configurable;
                };
                if (isCurrentScriptConfigurable()) {
                  Object.defineProperty(document, "currentScript", {
                    get: function get() {
                      return element;
                    },
                    configurable: true
                  });
                  isRedfinedCurrentScript = true;
                }
              },
              success: function success() {
                manualInvokeElementOnLoad(element);
                if (isRedfinedCurrentScript) {
                  delete document.currentScript;
                }
                element = null;
              },
              error: function error() {
                manualInvokeElementOnError(element);
                if (isRedfinedCurrentScript) {
                  delete document.currentScript;
                }
                element = null;
              }
            });
            var dynamicScriptCommentElement = document.createComment("dynamic script ".concat(src, " replaced by qiankun"));
            dynamicScriptAttachedCommentMap.set(element, dynamicScriptCommentElement);
            return rawDOMAppendOrInsertBefore.call(_mountDOM, dynamicScriptCommentElement, _referenceNode);
          }
          _execScripts(null, ["<script>".concat(text, "<\/script>")], proxy, {
            strictGlobal,
            scopedGlobalVariables
          });
          var dynamicInlineScriptCommentElement = document.createComment("dynamic inline script replaced by qiankun");
          dynamicScriptAttachedCommentMap.set(element, dynamicInlineScriptCommentElement);
          return rawDOMAppendOrInsertBefore.call(_mountDOM, dynamicInlineScriptCommentElement, _referenceNode);
        }
      }
    }
    return rawDOMAppendOrInsertBefore.call(this, element, refChild);
  };
}
function getNewRemoveChild(headOrBodyRemoveChild, containerConfigGetter, target) {
  return function removeChild(child) {
    var tagName = child.tagName;
    if (!isHijackingTag(tagName))
      return headOrBodyRemoveChild.call(this, child);
    try {
      var attachedElement;
      var _containerConfigGette = containerConfigGetter(child), appWrapperGetter = _containerConfigGette.appWrapperGetter, dynamicStyleSheetElements = _containerConfigGette.dynamicStyleSheetElements;
      switch (tagName) {
        case STYLE_TAG_NAME:
        case LINK_TAG_NAME: {
          attachedElement = dynamicLinkAttachedInlineStyleMap.get(child) || child;
          var dynamicElementIndex = dynamicStyleSheetElements.indexOf(attachedElement);
          if (dynamicElementIndex !== -1) {
            dynamicStyleSheetElements.splice(dynamicElementIndex, 1);
          }
          break;
        }
        case SCRIPT_TAG_NAME: {
          attachedElement = dynamicScriptAttachedCommentMap.get(child) || child;
          break;
        }
        default: {
          attachedElement = child;
        }
      }
      var appWrapper = appWrapperGetter();
      var container = target === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
      if (container.contains(attachedElement)) {
        return rawRemoveChild$1.call(attachedElement.parentNode, attachedElement);
      }
    } catch (e2) {
      console.warn(e2);
    }
    return headOrBodyRemoveChild.call(this, child);
  };
}
function patchHTMLDynamicAppendPrototypeFunctions(isInvokedByMicroApp, containerConfigGetter) {
  if (HTMLHeadElement.prototype.appendChild === rawHeadAppendChild && HTMLBodyElement.prototype.appendChild === rawBodyAppendChild && HTMLHeadElement.prototype.insertBefore === rawHeadInsertBefore) {
    HTMLHeadElement.prototype.appendChild = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawHeadAppendChild,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "head"
    });
    HTMLBodyElement.prototype.appendChild = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawBodyAppendChild,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "body"
    });
    HTMLHeadElement.prototype.insertBefore = getOverwrittenAppendChildOrInsertBefore({
      rawDOMAppendOrInsertBefore: rawHeadInsertBefore,
      containerConfigGetter,
      isInvokedByMicroApp,
      target: "head"
    });
  }
  if (HTMLHeadElement.prototype.removeChild === rawHeadRemoveChild && HTMLBodyElement.prototype.removeChild === rawBodyRemoveChild) {
    HTMLHeadElement.prototype.removeChild = getNewRemoveChild(rawHeadRemoveChild, containerConfigGetter, "head");
    HTMLBodyElement.prototype.removeChild = getNewRemoveChild(rawBodyRemoveChild, containerConfigGetter, "body");
  }
  return function unpatch() {
    HTMLHeadElement.prototype.appendChild = rawHeadAppendChild;
    HTMLHeadElement.prototype.removeChild = rawHeadRemoveChild;
    HTMLBodyElement.prototype.appendChild = rawBodyAppendChild;
    HTMLBodyElement.prototype.removeChild = rawBodyRemoveChild;
    HTMLHeadElement.prototype.insertBefore = rawHeadInsertBefore;
  };
}
function rebuildCSSRules(styleSheetElements, reAppendElement) {
  styleSheetElements.forEach(function(stylesheetElement) {
    var appendSuccess = reAppendElement(stylesheetElement);
    if (appendSuccess) {
      if (stylesheetElement instanceof HTMLStyleElement && isStyledComponentsLike(stylesheetElement)) {
        var cssRules = getStyledElementCSSRules(stylesheetElement);
        if (cssRules) {
          for (var i2 = 0; i2 < cssRules.length; i2++) {
            var cssRule = cssRules[i2];
            var cssStyleSheetElement = stylesheetElement.sheet;
            cssStyleSheetElement.insertRule(cssRule.cssText, cssStyleSheetElement.cssRules.length);
          }
        }
      }
    }
  });
}
function patchLooseSandbox(appName, appWrapperGetter, sandbox) {
  var mounting = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var scopedCSS = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var excludeAssetFilter = arguments.length > 5 ? arguments[5] : void 0;
  var proxy = sandbox.proxy;
  var dynamicStyleSheetElements = [];
  var unpatchDynamicAppendPrototypeFunctions = patchHTMLDynamicAppendPrototypeFunctions(
    /*
      check if the currently specified application is active
      While we switch page from qiankun app to a normal react routing page, the normal one may load stylesheet dynamically while page rendering,
      but the url change listener must wait until the current call stack is flushed.
      This scenario may cause we record the stylesheet from react routing page dynamic injection,
      and remove them after the url change triggered and qiankun app is unmounting
      see https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js#L222-L230
     */
    function() {
      return bt(window.location).some(function(name2) {
        return name2 === appName;
      });
    },
    function() {
      return {
        appName,
        appWrapperGetter,
        proxy,
        strictGlobal: false,
        speedySandbox: false,
        scopedCSS,
        dynamicStyleSheetElements,
        excludeAssetFilter
      };
    }
  );
  if (!mounting)
    calcAppCount(appName, "increase", "bootstrapping");
  if (mounting)
    calcAppCount(appName, "increase", "mounting");
  return function free() {
    if (!mounting)
      calcAppCount(appName, "decrease", "bootstrapping");
    if (mounting)
      calcAppCount(appName, "decrease", "mounting");
    if (isAllAppsUnmounted())
      unpatchDynamicAppendPrototypeFunctions();
    recordStyledComponentsCSSRules(dynamicStyleSheetElements);
    return function rebuild() {
      rebuildCSSRules(dynamicStyleSheetElements, function(stylesheetElement) {
        var appWrapper = appWrapperGetter();
        if (!appWrapper.contains(stylesheetElement)) {
          document.head.appendChild.call(appWrapper, stylesheetElement);
          return true;
        }
        return false;
      });
      if (mounting) {
        dynamicStyleSheetElements = [];
      }
    };
  };
}
Object.defineProperty(nativeGlobal, "__proxyAttachContainerConfigMap__", {
  enumerable: false,
  writable: true
});
nativeGlobal.__proxyAttachContainerConfigMap__ = nativeGlobal.__proxyAttachContainerConfigMap__ || /* @__PURE__ */ new WeakMap();
var proxyAttachContainerConfigMap = nativeGlobal.__proxyAttachContainerConfigMap__;
var elementAttachContainerConfigMap = /* @__PURE__ */ new WeakMap();
var docCreatePatchedMap = /* @__PURE__ */ new WeakMap();
var mutationObserverPatchedMap = /* @__PURE__ */ new WeakMap();
var parentNodePatchedMap = /* @__PURE__ */ new WeakMap();
function patchDocument(cfg) {
  var sandbox = cfg.sandbox, speedy = cfg.speedy;
  var attachElementToProxy = function attachElementToProxy2(element, proxy) {
    var proxyContainerConfig = proxyAttachContainerConfigMap.get(proxy);
    if (proxyContainerConfig) {
      elementAttachContainerConfigMap.set(element, proxyContainerConfig);
    }
  };
  if (speedy) {
    var proxyDocument = new Proxy(document, {
      set: function set(target, p2, value) {
        target[p2] = value;
        return true;
      },
      get: function get(target, p2) {
        if (p2 === "createElement") {
          var targetCreateElement = target.createElement;
          return function createElement2() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            var element = targetCreateElement.call.apply(targetCreateElement, [target].concat(args));
            attachElementToProxy(element, sandbox.proxy);
            return element;
          };
        }
        var value = target[p2];
        if (typeof value === "function" && !isBoundedFunction(value)) {
          return value.bind(target);
        }
        return value;
      }
    });
    sandbox.patchDocument(proxyDocument);
    var nativeMutationObserverObserveFn = MutationObserver.prototype.observe;
    if (!mutationObserverPatchedMap.has(nativeMutationObserverObserveFn)) {
      var observe = function observe2(target, options) {
        var realTarget = target instanceof Document ? nativeDocument : target;
        return nativeMutationObserverObserveFn.call(this, realTarget, options);
      };
      MutationObserver.prototype.observe = observe;
      mutationObserverPatchedMap.set(nativeMutationObserverObserveFn, observe);
    }
    var parentNodeDescriptor = Object.getOwnPropertyDescriptor(Node.prototype, "parentNode");
    if (parentNodeDescriptor && !parentNodePatchedMap.has(parentNodeDescriptor)) {
      var parentNodeGetter = parentNodeDescriptor.get, configurable = parentNodeDescriptor.configurable;
      if (parentNodeGetter && configurable) {
        var patchedParentNodeDescriptor = _objectSpread2(_objectSpread2({}, parentNodeDescriptor), {}, {
          get: function get() {
            var parentNode = parentNodeGetter.call(this);
            if (parentNode instanceof Document) {
              var _getCurrentRunningApp;
              var proxy = (_getCurrentRunningApp = getCurrentRunningApp()) === null || _getCurrentRunningApp === void 0 ? void 0 : _getCurrentRunningApp.window;
              if (proxy) {
                return proxy.document;
              }
            }
            return parentNode;
          }
        });
        Object.defineProperty(Node.prototype, "parentNode", patchedParentNodeDescriptor);
        parentNodePatchedMap.set(parentNodeDescriptor, patchedParentNodeDescriptor);
      }
    }
    return function() {
      MutationObserver.prototype.observe = nativeMutationObserverObserveFn;
      mutationObserverPatchedMap.delete(nativeMutationObserverObserveFn);
      if (parentNodeDescriptor) {
        Object.defineProperty(Node.prototype, "parentNode", parentNodeDescriptor);
        parentNodePatchedMap.delete(parentNodeDescriptor);
      }
    };
  }
  var docCreateElementFnBeforeOverwrite = docCreatePatchedMap.get(document.createElement);
  if (!docCreateElementFnBeforeOverwrite) {
    var rawDocumentCreateElement = document.createElement;
    Document.prototype.createElement = function createElement2(tagName, options) {
      var element = rawDocumentCreateElement.call(this, tagName, options);
      if (isHijackingTag(tagName)) {
        var _ref = getCurrentRunningApp() || {}, currentRunningSandboxProxy = _ref.window;
        if (currentRunningSandboxProxy) {
          attachElementToProxy(element, currentRunningSandboxProxy);
        }
      }
      return element;
    };
    if (document.hasOwnProperty("createElement")) {
      document.createElement = Document.prototype.createElement;
    }
    docCreatePatchedMap.set(Document.prototype.createElement, rawDocumentCreateElement);
  }
  return function unpatch() {
    if (docCreateElementFnBeforeOverwrite) {
      Document.prototype.createElement = docCreateElementFnBeforeOverwrite;
      document.createElement = docCreateElementFnBeforeOverwrite;
    }
  };
}
function patchStrictSandbox(appName, appWrapperGetter, sandbox) {
  var mounting = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : true;
  var scopedCSS = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var excludeAssetFilter = arguments.length > 5 ? arguments[5] : void 0;
  var speedySandbox = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : false;
  var proxy = sandbox.proxy;
  var containerConfig = proxyAttachContainerConfigMap.get(proxy);
  if (!containerConfig) {
    containerConfig = {
      appName,
      proxy,
      appWrapperGetter,
      dynamicStyleSheetElements: [],
      strictGlobal: true,
      speedySandbox,
      excludeAssetFilter,
      scopedCSS
    };
    proxyAttachContainerConfigMap.set(proxy, containerConfig);
  }
  var _containerConfig = containerConfig, dynamicStyleSheetElements = _containerConfig.dynamicStyleSheetElements;
  var unpatchDocument = patchDocument({
    sandbox,
    speedy: speedySandbox
  });
  var unpatchDynamicAppendPrototypeFunctions = patchHTMLDynamicAppendPrototypeFunctions(function(element) {
    return elementAttachContainerConfigMap.has(element);
  }, function(element) {
    return elementAttachContainerConfigMap.get(element);
  });
  if (!mounting)
    calcAppCount(appName, "increase", "bootstrapping");
  if (mounting)
    calcAppCount(appName, "increase", "mounting");
  return function free() {
    if (!mounting)
      calcAppCount(appName, "decrease", "bootstrapping");
    if (mounting)
      calcAppCount(appName, "decrease", "mounting");
    if (isAllAppsUnmounted()) {
      unpatchDynamicAppendPrototypeFunctions();
      unpatchDocument();
    }
    recordStyledComponentsCSSRules(dynamicStyleSheetElements);
    return function rebuild() {
      rebuildCSSRules(dynamicStyleSheetElements, function(stylesheetElement) {
        var appWrapper = appWrapperGetter();
        if (!appWrapper.contains(stylesheetElement)) {
          var mountDom = stylesheetElement[styleElementTargetSymbol] === "head" ? getAppWrapperHeadElement(appWrapper) : appWrapper;
          rawHeadAppendChild.call(mountDom, stylesheetElement);
          return true;
        }
        return false;
      });
    };
  };
}
function patch$2() {
  var rawHistoryListen = function rawHistoryListen2(_2) {
    return noop_1;
  };
  var historyListeners = [];
  var historyUnListens = [];
  if (window.g_history && isFunction_1(window.g_history.listen)) {
    rawHistoryListen = window.g_history.listen.bind(window.g_history);
    window.g_history.listen = function(listener) {
      historyListeners.push(listener);
      var unListen = rawHistoryListen(listener);
      historyUnListens.push(unListen);
      return function() {
        unListen();
        historyUnListens.splice(historyUnListens.indexOf(unListen), 1);
        historyListeners.splice(historyListeners.indexOf(listener), 1);
      };
    };
  }
  return function free() {
    var rebuild = noop_1;
    if (historyListeners.length) {
      rebuild = function rebuild2() {
        historyListeners.forEach(function(listener) {
          return window.g_history.listen(listener);
        });
      };
    }
    historyUnListens.forEach(function(unListen) {
      return unListen();
    });
    if (window.g_history && isFunction_1(window.g_history.listen)) {
      window.g_history.listen = rawHistoryListen;
    }
    return rebuild;
  };
}
var rawWindowInterval = window.setInterval;
var rawWindowClearInterval = window.clearInterval;
function patch$1(global2) {
  var intervals = [];
  global2.clearInterval = function(intervalId) {
    intervals = intervals.filter(function(id) {
      return id !== intervalId;
    });
    return rawWindowClearInterval.call(window, intervalId);
  };
  global2.setInterval = function(handler, timeout) {
    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }
    var intervalId = rawWindowInterval.apply(void 0, [handler, timeout].concat(args));
    intervals = [].concat(_toConsumableArray(intervals), [intervalId]);
    return intervalId;
  };
  return function free() {
    intervals.forEach(function(id) {
      return global2.clearInterval(id);
    });
    global2.setInterval = rawWindowInterval;
    global2.clearInterval = rawWindowClearInterval;
    return noop_1;
  };
}
var rawAddEventListener = window.addEventListener;
var rawRemoveEventListener = window.removeEventListener;
function patch(global2) {
  var listenerMap = /* @__PURE__ */ new Map();
  global2.addEventListener = function(type, listener, options) {
    var listeners = listenerMap.get(type) || [];
    listenerMap.set(type, [].concat(_toConsumableArray(listeners), [listener]));
    return rawAddEventListener.call(window, type, listener, options);
  };
  global2.removeEventListener = function(type, listener, options) {
    var storedTypeListeners = listenerMap.get(type);
    if (storedTypeListeners && storedTypeListeners.length && storedTypeListeners.indexOf(listener) !== -1) {
      storedTypeListeners.splice(storedTypeListeners.indexOf(listener), 1);
    }
    return rawRemoveEventListener.call(window, type, listener, options);
  };
  return function free() {
    listenerMap.forEach(function(listeners, type) {
      return _toConsumableArray(listeners).forEach(function(listener) {
        return global2.removeEventListener(type, listener);
      });
    });
    global2.addEventListener = rawAddEventListener;
    global2.removeEventListener = rawRemoveEventListener;
    return noop_1;
  };
}
function patchAtMounting(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox) {
  var _patchersInSandbox, _patchersInSandbox$sa;
  var basePatchers = [function() {
    return patch$1(sandbox.proxy);
  }, function() {
    return patch(sandbox.proxy);
  }, function() {
    return patch$2();
  }];
  var patchersInSandbox = (_patchersInSandbox = {}, _defineProperty$1(_patchersInSandbox, exports.SandBoxType.LegacyProxy, [].concat(basePatchers, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter);
  }])), _defineProperty$1(_patchersInSandbox, exports.SandBoxType.Proxy, [].concat(basePatchers, [function() {
    return patchStrictSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter, speedySandBox);
  }])), _defineProperty$1(_patchersInSandbox, exports.SandBoxType.Snapshot, [].concat(basePatchers, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, true, scopedCSS, excludeAssetFilter);
  }])), _patchersInSandbox);
  return (_patchersInSandbox$sa = patchersInSandbox[sandbox.type]) === null || _patchersInSandbox$sa === void 0 ? void 0 : _patchersInSandbox$sa.map(function(patch2) {
    return patch2();
  });
}
function patchAtBootstrapping(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox) {
  var _patchersInSandbox2, _patchersInSandbox$sa2;
  var patchersInSandbox = (_patchersInSandbox2 = {}, _defineProperty$1(_patchersInSandbox2, exports.SandBoxType.LegacyProxy, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter);
  }]), _defineProperty$1(_patchersInSandbox2, exports.SandBoxType.Proxy, [function() {
    return patchStrictSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter, speedySandBox);
  }]), _defineProperty$1(_patchersInSandbox2, exports.SandBoxType.Snapshot, [function() {
    return patchLooseSandbox(appName, elementGetter, sandbox, false, scopedCSS, excludeAssetFilter);
  }]), _patchersInSandbox2);
  return (_patchersInSandbox$sa2 = patchersInSandbox[sandbox.type]) === null || _patchersInSandbox$sa2 === void 0 ? void 0 : _patchersInSandbox$sa2.map(function(patch2) {
    return patch2();
  });
}
function iter(obj, callbackFn) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop) || prop === "clearInterval") {
      callbackFn(prop);
    }
  }
}
var SnapshotSandbox = /* @__PURE__ */ function() {
  function SnapshotSandbox2(name2) {
    _classCallCheck(this, SnapshotSandbox2);
    this.proxy = void 0;
    this.name = void 0;
    this.type = void 0;
    this.sandboxRunning = true;
    this.windowSnapshot = void 0;
    this.modifyPropsMap = {};
    this.name = name2;
    this.proxy = window;
    this.type = exports.SandBoxType.Snapshot;
  }
  _createClass(SnapshotSandbox2, [{
    key: "active",
    value: function active() {
      var _this = this;
      this.windowSnapshot = {};
      iter(window, function(prop) {
        _this.windowSnapshot[prop] = window[prop];
      });
      Object.keys(this.modifyPropsMap).forEach(function(p2) {
        window[p2] = _this.modifyPropsMap[p2];
      });
      this.sandboxRunning = true;
    }
  }, {
    key: "inactive",
    value: function inactive() {
      var _this2 = this;
      this.modifyPropsMap = {};
      iter(window, function(prop) {
        if (window[prop] !== _this2.windowSnapshot[prop]) {
          _this2.modifyPropsMap[prop] = window[prop];
          window[prop] = _this2.windowSnapshot[prop];
        }
      });
      if (process.env.NODE_ENV === "development") {
        console.info("[qiankun:sandbox] ".concat(this.name, " origin window restore..."), Object.keys(this.modifyPropsMap));
      }
      this.sandboxRunning = false;
    }
  }, {
    key: "patchDocument",
    value: function patchDocument2() {
    }
  }]);
  return SnapshotSandbox2;
}();
function createSandboxContainer(appName, elementGetter, scopedCSS, useLooseSandbox, excludeAssetFilter, globalContext, speedySandBox) {
  var sandbox;
  if (window.Proxy) {
    sandbox = useLooseSandbox ? new LegacySandbox(appName, globalContext) : new ProxySandbox(appName, globalContext, {
      speedy: !!speedySandBox
    });
  } else {
    sandbox = new SnapshotSandbox(appName);
  }
  var bootstrappingFreers = patchAtBootstrapping(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox);
  var mountingFreers = [];
  var sideEffectsRebuilders = [];
  return {
    instance: sandbox,
    /**
     * 沙箱被 mount
     * 可能是从 bootstrap 状态进入的 mount
     * 也可能是从 unmount 之后再次唤醒进入 mount
     */
    mount: function mount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
        var sideEffectsRebuildersAtBootstrapping, sideEffectsRebuildersAtMounting;
        return regenerator.wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                sandbox.active();
                sideEffectsRebuildersAtBootstrapping = sideEffectsRebuilders.slice(0, bootstrappingFreers.length);
                sideEffectsRebuildersAtMounting = sideEffectsRebuilders.slice(bootstrappingFreers.length);
                if (sideEffectsRebuildersAtBootstrapping.length) {
                  sideEffectsRebuildersAtBootstrapping.forEach(function(rebuild) {
                    return rebuild();
                  });
                }
                mountingFreers = patchAtMounting(appName, elementGetter, sandbox, scopedCSS, excludeAssetFilter, speedySandBox);
                if (sideEffectsRebuildersAtMounting.length) {
                  sideEffectsRebuildersAtMounting.forEach(function(rebuild) {
                    return rebuild();
                  });
                }
                sideEffectsRebuilders = [];
              case 7:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }))();
    },
    /**
     * 恢复 global 状态，使其能回到应用加载之前的状态
     */
    unmount: function unmount() {
      return _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1)
            switch (_context2.prev = _context2.next) {
              case 0:
                sideEffectsRebuilders = [].concat(_toConsumableArray(bootstrappingFreers), _toConsumableArray(mountingFreers)).map(function(free) {
                  return free();
                });
                sandbox.inactive();
              case 2:
              case "end":
                return _context2.stop();
            }
        }, _callee2);
      }))();
    }
  };
}
var _excluded$1 = ["singular", "sandbox", "excludeAssetFilter", "globalContext"];
function assertElementExist(element, msg) {
  if (!element) {
    if (msg) {
      throw new QiankunError(msg);
    }
    throw new QiankunError("element not existed!");
  }
}
function execHooksChain(hooks, app) {
  var global2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : window;
  if (hooks.length) {
    return hooks.reduce(function(chain, hook) {
      return chain.then(function() {
        return hook(app, global2);
      });
    }, Promise.resolve());
  }
  return Promise.resolve();
}
function validateSingularMode(_x, _x2) {
  return _validateSingularMode.apply(this, arguments);
}
function _validateSingularMode() {
  _validateSingularMode = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee(validate, app) {
    return regenerator.wrap(function _callee$(_context) {
      while (1)
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", typeof validate === "function" ? validate(app) : !!validate);
          case 1:
          case "end":
            return _context.stop();
        }
    }, _callee);
  }));
  return _validateSingularMode.apply(this, arguments);
}
var supportShadowDOM = !!document.head.attachShadow || !!document.head.createShadowRoot;
function createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId) {
  var containerElement = document.createElement("div");
  containerElement.innerHTML = appContent;
  var appElement = containerElement.firstChild;
  if (strictStyleIsolation) {
    if (!supportShadowDOM) {
      console.warn("[qiankun]: As current browser not support shadow dom, your strictStyleIsolation configuration will be ignored!");
    } else {
      var innerHTML = appElement.innerHTML;
      appElement.innerHTML = "";
      var shadow;
      if (appElement.attachShadow) {
        shadow = appElement.attachShadow({
          mode: "open"
        });
      } else {
        shadow = appElement.createShadowRoot();
      }
      shadow.innerHTML = innerHTML;
    }
  }
  if (scopedCSS) {
    var attr = appElement.getAttribute(QiankunCSSRewriteAttr);
    if (!attr) {
      appElement.setAttribute(QiankunCSSRewriteAttr, appInstanceId);
    }
    var styleNodes = appElement.querySelectorAll("style") || [];
    forEach_1(styleNodes, function(stylesheetElement) {
      process$1(appElement, stylesheetElement, appInstanceId);
    });
  }
  return appElement;
}
function getAppWrapperGetter(appInstanceId, useLegacyRender, strictStyleIsolation, scopedCSS, elementGetter) {
  return function() {
    if (useLegacyRender) {
      if (strictStyleIsolation)
        throw new QiankunError("strictStyleIsolation can not be used with legacy render!");
      if (scopedCSS)
        throw new QiankunError("experimentalStyleIsolation can not be used with legacy render!");
      var appWrapper = document.getElementById(getWrapperId(appInstanceId));
      assertElementExist(appWrapper, "Wrapper element for ".concat(appInstanceId, " is not existed!"));
      return appWrapper;
    }
    var element = elementGetter();
    assertElementExist(element, "Wrapper element for ".concat(appInstanceId, " is not existed!"));
    if (strictStyleIsolation && supportShadowDOM) {
      return element.shadowRoot;
    }
    return element;
  };
}
var rawAppendChild = HTMLElement.prototype.appendChild;
var rawRemoveChild = HTMLElement.prototype.removeChild;
function getRender(appInstanceId, appContent, legacyRender) {
  var render = function render2(_ref, phase) {
    var element = _ref.element, loading = _ref.loading, container = _ref.container;
    if (legacyRender) {
      if (process.env.NODE_ENV === "development") {
        console.error("[qiankun] Custom rendering function is deprecated and will be removed in 3.0, you can use the container element setting instead!");
      }
      return legacyRender({
        loading,
        appContent: element ? appContent : ""
      });
    }
    var containerElement = getContainer(container);
    if (phase !== "unmounted") {
      var errorMsg = function() {
        switch (phase) {
          case "loading":
          case "mounting":
            return "Target container with ".concat(container, " not existed while ").concat(appInstanceId, " ").concat(phase, "!");
          case "mounted":
            return "Target container with ".concat(container, " not existed after ").concat(appInstanceId, " ").concat(phase, "!");
          default:
            return "Target container with ".concat(container, " not existed while ").concat(appInstanceId, " rendering!");
        }
      }();
      assertElementExist(containerElement, errorMsg);
    }
    if (containerElement && !containerElement.contains(element)) {
      while (containerElement.firstChild) {
        rawRemoveChild.call(containerElement, containerElement.firstChild);
      }
      if (element) {
        rawAppendChild.call(containerElement, element);
      }
    }
    return void 0;
  };
  return render;
}
function getLifecyclesFromExports(scriptExports, appName, global2, globalLatestSetProp) {
  if (validateExportLifecycle(scriptExports)) {
    return scriptExports;
  }
  if (globalLatestSetProp) {
    var lifecycles = global2[globalLatestSetProp];
    if (validateExportLifecycle(lifecycles)) {
      return lifecycles;
    }
  }
  if (process.env.NODE_ENV === "development") {
    console.warn("[qiankun] lifecycle not found from ".concat(appName, " entry exports, fallback to get from window['").concat(appName, "']"));
  }
  var globalVariableExports = global2[appName];
  if (validateExportLifecycle(globalVariableExports)) {
    return globalVariableExports;
  }
  throw new QiankunError("You need to export lifecycle functions in ".concat(appName, " entry"));
}
var prevAppUnmountedDeferred;
function loadApp(_x3) {
  return _loadApp.apply(this, arguments);
}
function _loadApp() {
  _loadApp = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee17(app) {
    var _sandboxContainer, _sandboxContainer$ins;
    var configuration, lifeCycles, entry, appName, appInstanceId, markName, _configuration$singul, singular, _configuration$sandbo, sandbox, excludeAssetFilter, _configuration$global, globalContext, importEntryOpts, _yield$importEntry, template, execScripts, assetPublicPath, getExternalScripts, appContent, strictStyleIsolation, scopedCSS, initialAppWrapperElement, initialContainer, legacyRender, render, initialAppWrapperGetter, global2, mountSandbox, unmountSandbox, useLooseSandbox, speedySandbox, sandboxContainer, _mergeWith, _mergeWith$beforeUnmo, beforeUnmount, _mergeWith$afterUnmou, afterUnmount, _mergeWith$afterMount, afterMount, _mergeWith$beforeMoun, beforeMount, _mergeWith$beforeLoad, beforeLoad, scriptExports, _getLifecyclesFromExp, bootstrap, mount, unmount, update, _getMicroAppStateActi, onGlobalStateChange, setGlobalState, offGlobalStateChange, syncAppWrapperElement2Sandbox, parcelConfigGetter, _args17 = arguments;
    return regenerator.wrap(function _callee17$(_context17) {
      while (1)
        switch (_context17.prev = _context17.next) {
          case 0:
            configuration = _args17.length > 1 && _args17[1] !== void 0 ? _args17[1] : {};
            lifeCycles = _args17.length > 2 ? _args17[2] : void 0;
            entry = app.entry, appName = app.name;
            appInstanceId = genAppInstanceIdByName(appName);
            markName = "[qiankun] App ".concat(appInstanceId, " Loading");
            if (process.env.NODE_ENV === "development") {
              performanceMark(markName);
            }
            _configuration$singul = configuration.singular, singular = _configuration$singul === void 0 ? false : _configuration$singul, _configuration$sandbo = configuration.sandbox, sandbox = _configuration$sandbo === void 0 ? true : _configuration$sandbo, excludeAssetFilter = configuration.excludeAssetFilter, _configuration$global = configuration.globalContext, globalContext = _configuration$global === void 0 ? window : _configuration$global, importEntryOpts = _objectWithoutProperties(configuration, _excluded$1);
            _context17.next = 9;
            return importEntry(entry, importEntryOpts);
          case 9:
            _yield$importEntry = _context17.sent;
            template = _yield$importEntry.template;
            execScripts = _yield$importEntry.execScripts;
            assetPublicPath = _yield$importEntry.assetPublicPath;
            getExternalScripts = _yield$importEntry.getExternalScripts;
            _context17.next = 16;
            return getExternalScripts();
          case 16:
            _context17.next = 18;
            return validateSingularMode(singular, app);
          case 18:
            if (!_context17.sent) {
              _context17.next = 21;
              break;
            }
            _context17.next = 21;
            return prevAppUnmountedDeferred && prevAppUnmountedDeferred.promise;
          case 21:
            appContent = getDefaultTplWrapper(appInstanceId, sandbox)(template);
            strictStyleIsolation = _typeof$1(sandbox) === "object" && !!sandbox.strictStyleIsolation;
            if (process.env.NODE_ENV === "development" && strictStyleIsolation) {
              console.warn("[qiankun] strictStyleIsolation configuration will be removed in 3.0, pls don't depend on it or use experimentalStyleIsolation instead!");
            }
            scopedCSS = isEnableScopedCSS(sandbox);
            initialAppWrapperElement = createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId);
            initialContainer = "container" in app ? app.container : void 0;
            legacyRender = "render" in app ? app.render : void 0;
            render = getRender(appInstanceId, appContent, legacyRender);
            render({
              element: initialAppWrapperElement,
              loading: true,
              container: initialContainer
            }, "loading");
            initialAppWrapperGetter = getAppWrapperGetter(appInstanceId, !!legacyRender, strictStyleIsolation, scopedCSS, function() {
              return initialAppWrapperElement;
            });
            global2 = globalContext;
            mountSandbox = function mountSandbox2() {
              return Promise.resolve();
            };
            unmountSandbox = function unmountSandbox2() {
              return Promise.resolve();
            };
            useLooseSandbox = _typeof$1(sandbox) === "object" && !!sandbox.loose;
            speedySandbox = _typeof$1(sandbox) === "object" ? sandbox.speedy !== false : true;
            if (sandbox) {
              sandboxContainer = createSandboxContainer(
                appInstanceId,
                // FIXME should use a strict sandbox logic while remount, see https://github.com/umijs/qiankun/issues/518
                initialAppWrapperGetter,
                scopedCSS,
                useLooseSandbox,
                excludeAssetFilter,
                global2,
                speedySandbox
              );
              global2 = sandboxContainer.instance.proxy;
              mountSandbox = sandboxContainer.mount;
              unmountSandbox = sandboxContainer.unmount;
            }
            _mergeWith = mergeWith_1({}, getAddOns(global2, assetPublicPath), lifeCycles, function(v1, v2) {
              return concat_1(v1 !== null && v1 !== void 0 ? v1 : [], v2 !== null && v2 !== void 0 ? v2 : []);
            }), _mergeWith$beforeUnmo = _mergeWith.beforeUnmount, beforeUnmount = _mergeWith$beforeUnmo === void 0 ? [] : _mergeWith$beforeUnmo, _mergeWith$afterUnmou = _mergeWith.afterUnmount, afterUnmount = _mergeWith$afterUnmou === void 0 ? [] : _mergeWith$afterUnmou, _mergeWith$afterMount = _mergeWith.afterMount, afterMount = _mergeWith$afterMount === void 0 ? [] : _mergeWith$afterMount, _mergeWith$beforeMoun = _mergeWith.beforeMount, beforeMount = _mergeWith$beforeMoun === void 0 ? [] : _mergeWith$beforeMoun, _mergeWith$beforeLoad = _mergeWith.beforeLoad, beforeLoad = _mergeWith$beforeLoad === void 0 ? [] : _mergeWith$beforeLoad;
            _context17.next = 40;
            return execHooksChain(toArray(beforeLoad), app, global2);
          case 40:
            _context17.next = 42;
            return execScripts(global2, sandbox && !useLooseSandbox, {
              scopedGlobalVariables: speedySandbox ? cachedGlobals : []
            });
          case 42:
            scriptExports = _context17.sent;
            _getLifecyclesFromExp = getLifecyclesFromExports(scriptExports, appName, global2, (_sandboxContainer = sandboxContainer) === null || _sandboxContainer === void 0 ? void 0 : (_sandboxContainer$ins = _sandboxContainer.instance) === null || _sandboxContainer$ins === void 0 ? void 0 : _sandboxContainer$ins.latestSetProp), bootstrap = _getLifecyclesFromExp.bootstrap, mount = _getLifecyclesFromExp.mount, unmount = _getLifecyclesFromExp.unmount, update = _getLifecyclesFromExp.update;
            _getMicroAppStateActi = getMicroAppStateActions(appInstanceId), onGlobalStateChange = _getMicroAppStateActi.onGlobalStateChange, setGlobalState = _getMicroAppStateActi.setGlobalState, offGlobalStateChange = _getMicroAppStateActi.offGlobalStateChange;
            syncAppWrapperElement2Sandbox = function syncAppWrapperElement2Sandbox2(element) {
              return initialAppWrapperElement = element;
            };
            parcelConfigGetter = function parcelConfigGetter2() {
              var remountContainer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialContainer;
              var appWrapperElement;
              var appWrapperGetter;
              var parcelConfig = {
                name: appInstanceId,
                bootstrap,
                mount: [
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
                    var marks;
                    return regenerator.wrap(function _callee2$(_context2) {
                      while (1)
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (process.env.NODE_ENV === "development") {
                              marks = performanceGetEntriesByName(markName, "mark");
                              if (marks && !marks.length) {
                                performanceMark(markName);
                              }
                            }
                          case 1:
                          case "end":
                            return _context2.stop();
                        }
                    }, _callee2);
                  })),
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee3() {
                    return regenerator.wrap(function _callee3$(_context3) {
                      while (1)
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return validateSingularMode(singular, app);
                          case 2:
                            _context3.t0 = _context3.sent;
                            if (!_context3.t0) {
                              _context3.next = 5;
                              break;
                            }
                            _context3.t0 = prevAppUnmountedDeferred;
                          case 5:
                            if (!_context3.t0) {
                              _context3.next = 7;
                              break;
                            }
                            return _context3.abrupt("return", prevAppUnmountedDeferred.promise);
                          case 7:
                            return _context3.abrupt("return", void 0);
                          case 8:
                          case "end":
                            return _context3.stop();
                        }
                    }, _callee3);
                  })),
                  // initial wrapper element before app mount/remount
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee4() {
                    return regenerator.wrap(function _callee4$(_context4) {
                      while (1)
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            appWrapperElement = initialAppWrapperElement;
                            appWrapperGetter = getAppWrapperGetter(appInstanceId, !!legacyRender, strictStyleIsolation, scopedCSS, function() {
                              return appWrapperElement;
                            });
                          case 2:
                          case "end":
                            return _context4.stop();
                        }
                    }, _callee4);
                  })),
                  // 添加 mount hook, 确保每次应用加载前容器 dom 结构已经设置完毕
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee5() {
                    var useNewContainer;
                    return regenerator.wrap(function _callee5$(_context5) {
                      while (1)
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            useNewContainer = remountContainer !== initialContainer;
                            if (useNewContainer || !appWrapperElement) {
                              appWrapperElement = createElement(appContent, strictStyleIsolation, scopedCSS, appInstanceId);
                              syncAppWrapperElement2Sandbox(appWrapperElement);
                            }
                            render({
                              element: appWrapperElement,
                              loading: true,
                              container: remountContainer
                            }, "mounting");
                          case 3:
                          case "end":
                            return _context5.stop();
                        }
                    }, _callee5);
                  })),
                  mountSandbox,
                  // exec the chain after rendering to keep the behavior with beforeLoad
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee6() {
                    return regenerator.wrap(function _callee6$(_context6) {
                      while (1)
                        switch (_context6.prev = _context6.next) {
                          case 0:
                            return _context6.abrupt("return", execHooksChain(toArray(beforeMount), app, global2));
                          case 1:
                          case "end":
                            return _context6.stop();
                        }
                    }, _callee6);
                  })),
                  /* @__PURE__ */ function() {
                    var _ref7 = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee7(props2) {
                      return regenerator.wrap(function _callee7$(_context7) {
                        while (1)
                          switch (_context7.prev = _context7.next) {
                            case 0:
                              return _context7.abrupt("return", mount(_objectSpread2(_objectSpread2({}, props2), {}, {
                                container: appWrapperGetter(),
                                setGlobalState,
                                onGlobalStateChange
                              })));
                            case 1:
                            case "end":
                              return _context7.stop();
                          }
                      }, _callee7);
                    }));
                    return function(_x4) {
                      return _ref7.apply(this, arguments);
                    };
                  }(),
                  // finish loading after app mounted
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee8() {
                    return regenerator.wrap(function _callee8$(_context8) {
                      while (1)
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            return _context8.abrupt("return", render({
                              element: appWrapperElement,
                              loading: false,
                              container: remountContainer
                            }, "mounted"));
                          case 1:
                          case "end":
                            return _context8.stop();
                        }
                    }, _callee8);
                  })),
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee9() {
                    return regenerator.wrap(function _callee9$(_context9) {
                      while (1)
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            return _context9.abrupt("return", execHooksChain(toArray(afterMount), app, global2));
                          case 1:
                          case "end":
                            return _context9.stop();
                        }
                    }, _callee9);
                  })),
                  // initialize the unmount defer after app mounted and resolve the defer after it unmounted
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee10() {
                    return regenerator.wrap(function _callee10$(_context10) {
                      while (1)
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.next = 2;
                            return validateSingularMode(singular, app);
                          case 2:
                            if (!_context10.sent) {
                              _context10.next = 4;
                              break;
                            }
                            prevAppUnmountedDeferred = new Deferred();
                          case 4:
                          case "end":
                            return _context10.stop();
                        }
                    }, _callee10);
                  })),
                  /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee11() {
                    var measureName;
                    return regenerator.wrap(function _callee11$(_context11) {
                      while (1)
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            if (process.env.NODE_ENV === "development") {
                              measureName = "[qiankun] App ".concat(appInstanceId, " Loading Consuming");
                              performanceMeasure(measureName, markName);
                            }
                          case 1:
                          case "end":
                            return _context11.stop();
                        }
                    }, _callee11);
                  }))
                ],
                unmount: [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee12() {
                  return regenerator.wrap(function _callee12$(_context12) {
                    while (1)
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          return _context12.abrupt("return", execHooksChain(toArray(beforeUnmount), app, global2));
                        case 1:
                        case "end":
                          return _context12.stop();
                      }
                  }, _callee12);
                })), /* @__PURE__ */ function() {
                  var _ref13 = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee13(props2) {
                    return regenerator.wrap(function _callee13$(_context13) {
                      while (1)
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            return _context13.abrupt("return", unmount(_objectSpread2(_objectSpread2({}, props2), {}, {
                              container: appWrapperGetter()
                            })));
                          case 1:
                          case "end":
                            return _context13.stop();
                        }
                    }, _callee13);
                  }));
                  return function(_x5) {
                    return _ref13.apply(this, arguments);
                  };
                }(), unmountSandbox, /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee14() {
                  return regenerator.wrap(function _callee14$(_context14) {
                    while (1)
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          return _context14.abrupt("return", execHooksChain(toArray(afterUnmount), app, global2));
                        case 1:
                        case "end":
                          return _context14.stop();
                      }
                  }, _callee14);
                })), /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee15() {
                  return regenerator.wrap(function _callee15$(_context15) {
                    while (1)
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          render({
                            element: null,
                            loading: false,
                            container: remountContainer
                          }, "unmounted");
                          offGlobalStateChange(appInstanceId);
                          appWrapperElement = null;
                          syncAppWrapperElement2Sandbox(appWrapperElement);
                        case 4:
                        case "end":
                          return _context15.stop();
                      }
                  }, _callee15);
                })), /* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee16() {
                  return regenerator.wrap(function _callee16$(_context16) {
                    while (1)
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          _context16.next = 2;
                          return validateSingularMode(singular, app);
                        case 2:
                          _context16.t0 = _context16.sent;
                          if (!_context16.t0) {
                            _context16.next = 5;
                            break;
                          }
                          _context16.t0 = prevAppUnmountedDeferred;
                        case 5:
                          if (!_context16.t0) {
                            _context16.next = 7;
                            break;
                          }
                          prevAppUnmountedDeferred.resolve();
                        case 7:
                        case "end":
                          return _context16.stop();
                      }
                  }, _callee16);
                }))]
              };
              if (typeof update === "function") {
                parcelConfig.update = update;
              }
              return parcelConfig;
            };
            return _context17.abrupt("return", parcelConfigGetter);
          case 48:
          case "end":
            return _context17.stop();
        }
    }, _callee17);
  }));
  return _loadApp.apply(this, arguments);
}
var requestIdleCallback2 = window.requestIdleCallback || function requestIdleCallback3(cb) {
  var start2 = Date.now();
  return setTimeout(function() {
    cb({
      didTimeout: false,
      timeRemaining: function timeRemaining() {
        return Math.max(0, 50 - (Date.now() - start2));
      }
    });
  }, 1);
};
var isSlowNetwork = navigator.connection ? navigator.connection.saveData || navigator.connection.type !== "wifi" && navigator.connection.type !== "ethernet" && /([23])g/.test(navigator.connection.effectiveType) : false;
function prefetch(entry, opts) {
  if (!navigator.onLine || isSlowNetwork) {
    return;
  }
  requestIdleCallback2(/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
    var _yield$importEntry, getExternalScripts, getExternalStyleSheets;
    return regenerator.wrap(function _callee$(_context) {
      while (1)
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return importEntry(entry, opts);
          case 2:
            _yield$importEntry = _context.sent;
            getExternalScripts = _yield$importEntry.getExternalScripts;
            getExternalStyleSheets = _yield$importEntry.getExternalStyleSheets;
            requestIdleCallback2(getExternalStyleSheets);
            requestIdleCallback2(getExternalScripts);
          case 7:
          case "end":
            return _context.stop();
        }
    }, _callee);
  })));
}
function prefetchAfterFirstMounted(apps, opts) {
  window.addEventListener("single-spa:first-mount", function listener() {
    var notLoadedApps = apps.filter(function(app) {
      return Pt(app.name) === l;
    });
    if (process.env.NODE_ENV === "development") {
      var mountedApps = Et();
      console.log("[qiankun] prefetch starting after ".concat(mountedApps, " mounted..."), notLoadedApps);
    }
    notLoadedApps.forEach(function(_ref2) {
      var entry = _ref2.entry;
      return prefetch(entry, opts);
    });
    window.removeEventListener("single-spa:first-mount", listener);
  });
}
function prefetchImmediately(apps, opts) {
  if (process.env.NODE_ENV === "development") {
    console.log("[qiankun] prefetch starting for apps...", apps);
  }
  apps.forEach(function(_ref3) {
    var entry = _ref3.entry;
    return prefetch(entry, opts);
  });
}
function doPrefetchStrategy(apps, prefetchStrategy, importEntryOpts) {
  var appsName2Apps = function appsName2Apps2(names) {
    return apps.filter(function(app) {
      return names.includes(app.name);
    });
  };
  if (Array.isArray(prefetchStrategy)) {
    prefetchAfterFirstMounted(appsName2Apps(prefetchStrategy), importEntryOpts);
  } else if (isFunction_1(prefetchStrategy)) {
    _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
      var _yield$prefetchStrate, _yield$prefetchStrate2, criticalAppNames, _yield$prefetchStrate3, minorAppsName;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1)
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return prefetchStrategy(apps);
            case 2:
              _yield$prefetchStrate = _context2.sent;
              _yield$prefetchStrate2 = _yield$prefetchStrate.criticalAppNames;
              criticalAppNames = _yield$prefetchStrate2 === void 0 ? [] : _yield$prefetchStrate2;
              _yield$prefetchStrate3 = _yield$prefetchStrate.minorAppsName;
              minorAppsName = _yield$prefetchStrate3 === void 0 ? [] : _yield$prefetchStrate3;
              prefetchImmediately(appsName2Apps(criticalAppNames), importEntryOpts);
              prefetchAfterFirstMounted(appsName2Apps(minorAppsName), importEntryOpts);
            case 9:
            case "end":
              return _context2.stop();
          }
      }, _callee2);
    }))();
  } else {
    switch (prefetchStrategy) {
      case true:
        prefetchAfterFirstMounted(apps, importEntryOpts);
        break;
      case "all":
        prefetchImmediately(apps, importEntryOpts);
        break;
    }
  }
}
var _excluded = ["name", "activeRule", "loader", "props"], _excluded2 = ["mount"], _excluded3 = ["prefetch", "sandbox", "singular", "urlRerouteOnly"];
var microApps = [];
var frameworkConfiguration = {};
var started = false;
var defaultUrlRerouteOnly = true;
var frameworkStartedDefer = new Deferred();
var autoDowngradeForLowVersionBrowser = function autoDowngradeForLowVersionBrowser2(configuration) {
  var sandbox = configuration.sandbox, singular = configuration.singular;
  if (sandbox) {
    if (!window.Proxy) {
      console.warn("[qiankun] Miss window.Proxy, proxySandbox will degenerate into snapshotSandbox");
      if (singular === false) {
        console.warn("[qiankun] Setting singular as false may cause unexpected behavior while your browser not support window.Proxy");
      }
      return _objectSpread2(_objectSpread2({}, configuration), {}, {
        sandbox: _typeof$1(sandbox) === "object" ? _objectSpread2(_objectSpread2({}, sandbox), {}, {
          loose: true
        }) : {
          loose: true
        }
      });
    }
  }
  return configuration;
};
function registerMicroApps(apps, lifeCycles) {
  var unregisteredApps = apps.filter(function(app) {
    return !microApps.some(function(registeredApp) {
      return registeredApp.name === app.name;
    });
  });
  microApps = [].concat(_toConsumableArray(microApps), _toConsumableArray(unregisteredApps));
  unregisteredApps.forEach(function(app) {
    var name2 = app.name, activeRule = app.activeRule, _app$loader = app.loader, loader = _app$loader === void 0 ? noop_1 : _app$loader, props2 = app.props, appConfig = _objectWithoutProperties(app, _excluded);
    Ot({
      name: name2,
      app: function() {
        var _app = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee3() {
          var _yield$loadApp, mount, otherMicroAppConfigs;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1)
              switch (_context3.prev = _context3.next) {
                case 0:
                  loader(true);
                  _context3.next = 3;
                  return frameworkStartedDefer.promise;
                case 3:
                  _context3.next = 5;
                  return loadApp(_objectSpread2({
                    name: name2,
                    props: props2
                  }, appConfig), frameworkConfiguration, lifeCycles);
                case 5:
                  _context3.t0 = _context3.sent;
                  _yield$loadApp = (0, _context3.t0)();
                  mount = _yield$loadApp.mount;
                  otherMicroAppConfigs = _objectWithoutProperties(_yield$loadApp, _excluded2);
                  return _context3.abrupt("return", _objectSpread2({
                    mount: [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee() {
                      return regenerator.wrap(function _callee$(_context) {
                        while (1)
                          switch (_context.prev = _context.next) {
                            case 0:
                              return _context.abrupt("return", loader(true));
                            case 1:
                            case "end":
                              return _context.stop();
                          }
                      }, _callee);
                    }))].concat(_toConsumableArray(toArray(mount)), [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee2() {
                      return regenerator.wrap(function _callee2$(_context2) {
                        while (1)
                          switch (_context2.prev = _context2.next) {
                            case 0:
                              return _context2.abrupt("return", loader(false));
                            case 1:
                            case "end":
                              return _context2.stop();
                          }
                      }, _callee2);
                    }))])
                  }, otherMicroAppConfigs));
                case 10:
                case "end":
                  return _context3.stop();
              }
          }, _callee3);
        }));
        function app2() {
          return _app.apply(this, arguments);
        }
        return app2;
      }(),
      activeWhen: activeRule,
      customProps: props2
    });
  });
}
var appConfigPromiseGetterMap = /* @__PURE__ */ new Map();
var containerMicroAppsMap = /* @__PURE__ */ new Map();
function loadMicroApp(app, configuration, lifeCycles) {
  var props2 = app.props, name2 = app.name;
  var container = "container" in app ? app.container : void 0;
  var containerXPath = getContainerXPath(container);
  var appContainerXPathKey = "".concat(name2, "-").concat(containerXPath);
  var microApp;
  var wrapParcelConfigForRemount = function wrapParcelConfigForRemount2(config) {
    var microAppConfig = config;
    if (container) {
      if (containerXPath) {
        var containerMicroApps = containerMicroAppsMap.get(appContainerXPathKey);
        if (containerMicroApps === null || containerMicroApps === void 0 ? void 0 : containerMicroApps.length) {
          var mount = [/* @__PURE__ */ _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee4() {
            var prevLoadMicroApps, prevLoadMicroAppsWhichNotBroken;
            return regenerator.wrap(function _callee4$(_context4) {
              while (1)
                switch (_context4.prev = _context4.next) {
                  case 0:
                    prevLoadMicroApps = containerMicroApps.slice(0, containerMicroApps.indexOf(microApp));
                    prevLoadMicroAppsWhichNotBroken = prevLoadMicroApps.filter(function(v2) {
                      return v2.getStatus() !== "LOAD_ERROR" && v2.getStatus() !== "SKIP_BECAUSE_BROKEN";
                    });
                    _context4.next = 4;
                    return Promise.all(prevLoadMicroAppsWhichNotBroken.map(function(v2) {
                      return v2.unmountPromise;
                    }));
                  case 4:
                  case "end":
                    return _context4.stop();
                }
            }, _callee4);
          }))].concat(_toConsumableArray(toArray(microAppConfig.mount)));
          microAppConfig = _objectSpread2(_objectSpread2({}, config), {}, {
            mount
          });
        }
      }
    }
    return _objectSpread2(_objectSpread2({}, microAppConfig), {}, {
      // empty bootstrap hook which should not run twice while it calling from cached micro app
      bootstrap: function bootstrap() {
        return Promise.resolve();
      }
    });
  };
  var memorizedLoadingFn = /* @__PURE__ */ function() {
    var _ref4 = _asyncToGenerator(/* @__PURE__ */ regenerator.mark(function _callee5() {
      var userConfiguration, $$cacheLifecycleByAppName, parcelConfigGetterPromise, _parcelConfigGetterPromise, parcelConfigObjectGetterPromise;
      return regenerator.wrap(function _callee5$(_context5) {
        while (1)
          switch (_context5.prev = _context5.next) {
            case 0:
              userConfiguration = autoDowngradeForLowVersionBrowser(configuration !== null && configuration !== void 0 ? configuration : _objectSpread2(_objectSpread2({}, frameworkConfiguration), {}, {
                singular: false
              }));
              $$cacheLifecycleByAppName = userConfiguration.$$cacheLifecycleByAppName;
              if (!container) {
                _context5.next = 21;
                break;
              }
              if (!$$cacheLifecycleByAppName) {
                _context5.next = 12;
                break;
              }
              parcelConfigGetterPromise = appConfigPromiseGetterMap.get(name2);
              if (!parcelConfigGetterPromise) {
                _context5.next = 12;
                break;
              }
              _context5.t0 = wrapParcelConfigForRemount;
              _context5.next = 9;
              return parcelConfigGetterPromise;
            case 9:
              _context5.t1 = _context5.sent;
              _context5.t2 = (0, _context5.t1)(container);
              return _context5.abrupt("return", (0, _context5.t0)(_context5.t2));
            case 12:
              if (!containerXPath) {
                _context5.next = 21;
                break;
              }
              _parcelConfigGetterPromise = appConfigPromiseGetterMap.get(appContainerXPathKey);
              if (!_parcelConfigGetterPromise) {
                _context5.next = 21;
                break;
              }
              _context5.t3 = wrapParcelConfigForRemount;
              _context5.next = 18;
              return _parcelConfigGetterPromise;
            case 18:
              _context5.t4 = _context5.sent;
              _context5.t5 = (0, _context5.t4)(container);
              return _context5.abrupt("return", (0, _context5.t3)(_context5.t5));
            case 21:
              parcelConfigObjectGetterPromise = loadApp(app, userConfiguration, lifeCycles);
              if (container) {
                if ($$cacheLifecycleByAppName) {
                  appConfigPromiseGetterMap.set(name2, parcelConfigObjectGetterPromise);
                } else if (containerXPath)
                  appConfigPromiseGetterMap.set(appContainerXPathKey, parcelConfigObjectGetterPromise);
              }
              _context5.next = 25;
              return parcelConfigObjectGetterPromise;
            case 25:
              _context5.t6 = _context5.sent;
              return _context5.abrupt("return", (0, _context5.t6)(container));
            case 27:
            case "end":
              return _context5.stop();
          }
      }, _callee5);
    }));
    return function memorizedLoadingFn2() {
      return _ref4.apply(this, arguments);
    };
  }();
  if (!started && (configuration === null || configuration === void 0 ? void 0 : configuration.autoStart) !== false) {
    var _frameworkConfigurati;
    xt({
      urlRerouteOnly: (_frameworkConfigurati = frameworkConfiguration.urlRerouteOnly) !== null && _frameworkConfigurati !== void 0 ? _frameworkConfigurati : defaultUrlRerouteOnly
    });
  }
  microApp = C(memorizedLoadingFn, _objectSpread2({
    domElement: document.createElement("div")
  }, props2));
  if (container) {
    if (containerXPath) {
      var microAppsRef = containerMicroAppsMap.get(appContainerXPathKey) || [];
      microAppsRef.push(microApp);
      containerMicroAppsMap.set(appContainerXPathKey, microAppsRef);
      var cleanup = function cleanup2() {
        var index = microAppsRef.indexOf(microApp);
        microAppsRef.splice(index, 1);
        microApp = null;
      };
      microApp.unmountPromise.then(cleanup).catch(cleanup);
    }
  }
  return microApp;
}
function start() {
  var opts = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  frameworkConfiguration = _objectSpread2({
    prefetch: true,
    singular: true,
    sandbox: true
  }, opts);
  var _frameworkConfigurati2 = frameworkConfiguration, prefetch2 = _frameworkConfigurati2.prefetch;
  _frameworkConfigurati2.sandbox;
  _frameworkConfigurati2.singular;
  var _frameworkConfigurati3 = _frameworkConfigurati2.urlRerouteOnly, urlRerouteOnly = _frameworkConfigurati3 === void 0 ? defaultUrlRerouteOnly : _frameworkConfigurati3, importEntryOpts = _objectWithoutProperties(_frameworkConfigurati2, _excluded3);
  if (prefetch2) {
    doPrefetchStrategy(microApps, prefetch2, importEntryOpts);
  }
  frameworkConfiguration = autoDowngradeForLowVersionBrowser(frameworkConfiguration);
  xt({
    urlRerouteOnly
  });
  started = true;
  frameworkStartedDefer.resolve();
}
function addGlobalUncaughtErrorHandler(errorHandler) {
  window.addEventListener("error", errorHandler);
  window.addEventListener("unhandledrejection", errorHandler);
}
function removeGlobalUncaughtErrorHandler(errorHandler) {
  window.removeEventListener("error", errorHandler);
  window.removeEventListener("unhandledrejection", errorHandler);
}
var firstMountLogLabel = "[qiankun] first app mounted";
if (process.env.NODE_ENV === "development") {
  console.time(firstMountLogLabel);
}
function setDefaultMountApp(defaultAppLink) {
  window.addEventListener("single-spa:no-app-change", function listener() {
    var mountedApps = Et();
    if (!mountedApps.length) {
      nt(defaultAppLink);
    }
    window.removeEventListener("single-spa:no-app-change", listener);
  });
}
function runDefaultMountEffects(defaultAppLink) {
  console.warn("[qiankun] runDefaultMountEffects will be removed in next version, please use setDefaultMountApp instead");
  setDefaultMountApp(defaultAppLink);
}
function runAfterFirstMounted(effect) {
  window.addEventListener("single-spa:first-mount", function listener() {
    if (process.env.NODE_ENV === "development") {
      console.timeEnd(firstMountLogLabel);
    }
    effect();
    window.removeEventListener("single-spa:first-mount", listener);
  });
}
const debug$5 = createDebug("DL:Vue-useCollectError");
const useCollectError = (collect, onError) => {
  const errorHandler = (error) => {
    collect == null ? void 0 : collect(exports.CollectType.MicroError, error);
    debug$5("【%s】 子应用生命周期函数或激活函数期执行出错 %O", error == null ? void 0 : error.appOrParcelName, error);
    onError == null ? void 0 : onError(error);
  };
  const globalUncaughtErrorHandler = (error) => {
    collect == null ? void 0 : collect(exports.CollectType.GlobalUncaughtError, {
      ...error
    });
    debug$5("【Error】出现全局未捕获异常：%O", error);
    onError == null ? void 0 : onError(error);
  };
  vueDemi.onBeforeMount(() => {
    a(errorHandler);
    addGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
  });
  vueDemi.onUnmounted(() => {
    c(errorHandler);
    removeGlobalUncaughtErrorHandler(globalUncaughtErrorHandler);
  });
};
const RouteAppContainer = vueDemi.defineComponent({
  props: ["containerIdentity"],
  setup(props2, {
    slots
  }) {
    const {
      containerIdentity: container
    } = props2 || {};
    const identity2 = {};
    if (typeof container === "string") {
      if (container.startsWith("#")) {
        identity2.id = container.substring(1);
      } else if (container.startsWith(".")) {
        identity2.id = container.substring(1);
      } else if (container) {
        identity2.id = container;
      }
    }
    return () => {
      var _a;
      return vueDemi.h("div", {
        "attrs": {
          ...identity2
        }
      }, [(_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const debug$4 = createDebug("DL:Vue-Teleport");
const props = {
  to: {
    type: [String, HTMLElement]
  }
};
const Teleport = vueDemi.defineComponent({
  props,
  setup(props2, {
    slots
  }) {
    vueDemi.ref(null);
    let microContainer;
    let originStyle;
    let container;
    vueDemi.onMounted(() => {
      var _a, _b, _c, _d;
      const vm = vueDemi.getCurrentInstance();
      container = typeof props2.to === "string" ? document.getElementById(props2.to) : props2.to;
      debug$4("挂载兜底降级组件，降级容器%O：", container);
      if (container) {
        (_b = container == null ? void 0 : container.appendChild) == null ? void 0 : _b.call(container, (_a = vm == null ? void 0 : vm.refs) == null ? void 0 : _a.el);
      }
      try {
        if (container && ((_c = container == null ? void 0 : container.dataset) == null ? void 0 : _c.dlDowngradContainer)) {
          microContainer = document.getElementById((_d = container == null ? void 0 : container.dataset) == null ? void 0 : _d.dlDowngradContainer);
          if (microContainer) {
            originStyle = microContainer.style;
            microContainer.style.opacity = "0";
            microContainer.style.overflow = "hidden";
            microContainer.style.height = "0";
          }
        }
      } catch (e2) {
        debug$4("【Error】设置子应用容器Style异常：%O", e2);
      }
    });
    vueDemi.onUnmounted(() => {
      while (container == null ? void 0 : container.firstChild) {
        container == null ? void 0 : container.removeChild(container == null ? void 0 : container.firstChild);
      }
      debug$4("卸载载兜底降级组件, 降级容器%O:", container);
      if (microContainer) {
        microContainer.style = {
          ...originStyle
        };
      }
    });
    return () => {
      var _a;
      return vueDemi.h("div", {
        "ref": "el"
      }, [(_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
const debug$3 = createDebug("DL:Vue-Switch");
const defaultCollect$2 = createDefaultCollect(debug$3);
const microAppStateActions = initGlobalState({});
const BootstrapComponent = vueDemi.defineComponent({
  props: ["extra", "advanced", "collect", "loader", "defaultMountAppLink", "isOccupyOuterContainer", "containerId", "activeFilter", "onFirstMount", "onBeforeLoad", "onBeforeMount", "onAfterMount", "onBeforeUnmount", "onAfterUnmount", "onError", "microList"],
  setup(props2, {
    slots
  }) {
    const registrableMicros = vueDemi.ref([]);
    const downgradMicros = vueDemi.ref([]);
    const hasActivedMicroApp = vueDemi.ref(true);
    const firstMountListener = () => {
      var _a;
      debug$3("第一个微应用完成挂载（Mount）");
      (_a = props2 == null ? void 0 : props2.onFirstMount) == null ? void 0 : _a.call(props2);
      window.removeEventListener("single-spa:first-mount", firstMountListener);
    };
    vueDemi.onBeforeMount(() => {
      window.addEventListener("single-spa:first-mount", firstMountListener);
    });
    vueDemi.onUnmounted(() => {
      window.removeEventListener("single-spa:first-mount", firstMountListener);
    });
    const init = () => {
      var _a, _b;
      let micros = [];
      let notFoundMicros = [];
      (_b = (_a = props2 == null ? void 0 : props2.microList) == null ? void 0 : _a.map) == null ? void 0 : _b.call(_a, (it2) => {
        if ((it2 == null ? void 0 : it2.name) && (it2 == null ? void 0 : it2.entry) && (it2 == null ? void 0 : it2.activeRule)) {
          const micro = {
            name: it2.name,
            entry: it2.entry,
            container: `#${props2.containerId}`,
            activeRule: it2.activeRule,
            loader: props2 == null ? void 0 : props2.loader,
            props: {
              diluRouteActiveRule: it2.activeRule,
              ...props2 == null ? void 0 : props2.extra,
              ...it2 == null ? void 0 : it2.extras,
              ...it2 == null ? void 0 : it2.extra
            }
          };
          micros.push(micro);
        }
      });
      notFoundMicros.push((slotProps) => {
        var _a2;
        return ((_a2 = slots == null ? void 0 : slots.default) == null ? void 0 : _a2.call(slots, slotProps)) || "";
      });
      debug$3("完成子应用信息的收集：%O", micros);
      micros = filterMicrosByActiveRule(micros, props2 == null ? void 0 : props2.activeFilter);
      debug$3("完成子应用激活规则去重过滤：%O", micros);
      registrableMicros.value = micros;
      downgradMicros.value = notFoundMicros;
      debug$3("初始化时，判断是否存在激活的应用");
      hasActivedMicroApp.value = judgeActivedMicroApp(micros);
      debug$3("存在%d个兜底组件", notFoundMicros.length);
      let lifeCycle = getLifeCycle((lifeCycleName, app) => {
        if (typeof (props2 == null ? void 0 : props2[lifeCycleName]) === "function") {
          props2[lifeCycleName](app);
        }
      }, props2 == null ? void 0 : props2.collect);
      registerMicroApps(micros, lifeCycle);
      debug$3("完成子应用注册");
      if (props2 == null ? void 0 : props2.defaultMountAppLink) {
        debug$3("设置默认进入的子应用：【%s】", props2 == null ? void 0 : props2.defaultMountAppLink);
        setDefaultMountApp(props2.defaultMountAppLink);
      }
      start(props2 == null ? void 0 : props2.advanced);
    };
    const beforeRoutingEventListener = (e2) => {
      const {
        newUrl,
        oldUrl
      } = e2.detail;
      if (newUrl != oldUrl && registrableMicros.value.length) {
        debug$3("通过single-spa:before-routing-event 调用 judgeActivedMicroApp");
        hasActivedMicroApp.value = judgeActivedMicroApp(registrableMicros.value);
      }
    };
    useCollectError((props2 == null ? void 0 : props2.collect) || defaultCollect$2, props2 == null ? void 0 : props2.onError);
    vueDemi.onMounted(() => {
      if ((props2 == null ? void 0 : props2.containerId) && containerIsExists(props2.containerId)) {
        debug$3("为子应用容器【%s】创建兜底DOM", props2.containerId);
        createDowngradContainer(props2.containerId);
      } else if (props2.isOccupyOuterContainer) {
        debug$3("没有找到指定的子应用的容器：【%s】", props2.containerId);
      }
      init();
      window.addEventListener("single-spa:before-routing-event", beforeRoutingEventListener);
      window.addEventListener("single-spa:first-mount", firstMountListener);
    });
    vueDemi.onUnmounted(() => {
      microAppStateActions.offGlobalStateChange();
      window.removeEventListener("single-spa:first-mount", firstMountListener);
      window.removeEventListener("single-spa:before-routing-event", beforeRoutingEventListener);
    });
    vueDemi.watch(() => props2.extra, (value) => {
      microAppStateActions.setGlobalState(value || {});
    });
    return () => {
      var _a;
      return vueDemi.h("div", [vueDemi.h(RouteAppContainer, {
        "attrs": {
          ...{
            containerIdentity: props2.isOccupyOuterContainer ? "" : props2.containerId
          }
        }
      }), !!registrableMicros.value.length && !hasActivedMicroApp.value ? vueDemi.h(Teleport, {
        "attrs": {
          ...{
            to: findDowngradContainer(props2.containerId)
          }
        }
      }, [(_a = downgradMicros == null ? void 0 : downgradMicros.value) == null ? void 0 : _a.map((slot) => {
        var _a2;
        const state = {
          isActived: hasActivedMicroApp.value
        };
        if (!registrableMicros.value.length || hasActivedMicroApp.value) {
          state.hasAuth = props2.activeFilter ? (_a2 = props2.activeFilter) == null ? void 0 : _a2.call(props2, window.location) : true;
        }
        return slot == null ? void 0 : slot({
          state,
          list: registrableMicros.value
        });
      })]) : null]);
    };
  }
});
const debug$2 = createDebug("DL:Vue-Switch");
const DLSwitch = vueDemi.defineComponent({
  props: ["extra", "advanced", "collect", "loader", "defaultMountAppLink", "isOccupyOuterContainer", "containerId", "activeFilter", "onFirstMount", "onBeforeLoad", "onBeforeMount", "onAfterMount", "onBeforeUnmount", "onAfterUnmount", "onError", "microList"],
  inheritAttrs: false,
  setup(props2, {
    slots
  }) {
    const isUseOuterContainer = vueDemi.computed(() => {
      let flag = false;
      if (props2.isOccupyOuterContainer) {
        if (props2.containerId) {
          flag = true;
        } else {
          debug$2("isOccupyOuterContainer 为true时没有设置containerId，所以不启用外部容器");
          flag = false;
        }
      } else {
        flag = false;
      }
      debug$2("是否启用使用外部容器的能力: 【%s】", flag);
      return flag;
    });
    const wrapperId = vueDemi.computed(() => {
      if (props2.containerId) {
        return props2.containerId;
      }
      return containerRandomId;
    });
    return () => vueDemi.h(BootstrapComponent, {
      "attrs": {
        ...{
          ...props2,
          containerId: wrapperId.value,
          isOccupyOuterContainer: isUseOuterContainer.value
        }
      }
    }, [slots == null ? void 0 : slots.default]);
  }
});
const DLRoute = vueDemi.defineComponent({
  props: ["name", "entry", "activeRule", "extra", "extras"],
  name: "DLRoute",
  setup(props2, {
    slots
  }) {
    return () => {
      var _a;
      if (!props2.name || !props2.entry || !(props2 == null ? void 0 : props2.activeRule)) {
        return (_a = slots == null ? void 0 : slots.default) == null ? void 0 : _a.call(slots);
      }
      return null;
    };
  }
});
const debug$1 = createDebug("DL:Vue-Router");
const defaultCollect$1 = createDefaultCollect(debug$1);
const DLRouter = vueDemi.defineComponent({
  name: "DLRouter",
  components: {
    DLSwitch,
    DLRoute
  },
  props: ["extra", "advanced", "collect", "loader", "defaultMountAppLink", "isOccupyOuterContainer", "containerId", "activeFilter", "onFirstMount", "onBeforeLoad", "onBeforeMount", "onAfterMount", "onBeforeUnmount", "onAfterUnmount", "onError", "fetchMicros"],
  setup(props2, {
    slots
  }) {
    const fetchStatus = vueDemi.ref(exports.FetchStatus.Init);
    const microList = vueDemi.ref([]);
    const {
      collect = defaultCollect$1,
      fetchMicros,
      ...restProps
    } = props2;
    vueDemi.onBeforeMount(async () => {
      var _a, _b;
      fetchStatus.value = exports.FetchStatus.Fetching;
      try {
        const micros = await ((_a = props2 == null ? void 0 : props2.fetchMicros) == null ? void 0 : _a.call(props2));
        debug$1("获取到子应用列表: %O", micros);
        microList.value = (_b = micros == null ? void 0 : micros.filter) == null ? void 0 : _b.call(micros, (micro) => {
          return micro.type === exports.MicroType.Route;
        });
        fetchStatus.value = exports.FetchStatus.Fetched;
      } catch (e2) {
        collect(exports.CollectType.ERROR, e2);
        debug$1("获取到子应用列表失败: %O", e2);
        fetchStatus.value = exports.FetchStatus.Error;
      }
    });
    return () => fetchStatus.value == exports.FetchStatus.Fetched ? vueDemi.h(DLSwitch, {
      "attrs": {
        ...{
          ...restProps,
          collect,
          microList: microList.value
        }
      }
    }, [slots == null ? void 0 : slots.default]) : null;
  }
});
const expose = (exposing) => {
  const instance = vueDemi.getCurrentInstance();
  if (!instance) {
    throw new Error("expose should be called in setup().");
  }
  const keys2 = Object.keys(exposing);
  keys2.forEach((key) => {
    instance.proxy[key] = exposing[key];
  });
  vueDemi.onBeforeUnmount(() => {
    keys2.forEach((key) => {
      instance.proxy[key] = void 0;
    });
  });
};
const debug = createDebug("DL:Vue-Widget");
const defaultCollect = createDefaultCollect(debug);
const DLWidget = vueDemi.defineComponent({
  props: ["name", "entry", "extra", "advanced", "collect", "loader", "onBeforeLoad", "onBeforeMount", "onAfterMount", "onBeforeUnmount", "onAfterUnmount", "onError"],
  setup(props2, {
    slots
  }) {
    const {
      collect = defaultCollect,
      loader = (_x) => {
      }
    } = props2;
    const microAppRef = vueDemi.reactive({
      instance: null
    });
    const init = () => {
      var _a;
      const vm = vueDemi.getCurrentInstance();
      loader == null ? void 0 : loader(true);
      debug("【%s】子应用开始初始化", props2.name);
      const instance = loadMicroApp({
        name: props2.name,
        entry: props2.entry,
        container: (_a = vm == null ? void 0 : vm.refs) == null ? void 0 : _a.container,
        props: {
          ...props2.extra,
          isDLWidget: true
        }
      }, (props2 == null ? void 0 : props2.advanced) || {}, {
        beforeLoad: (app) => {
          var _a2;
          debug("【%s】子应用开始加载-beforeLoad", props2.name);
          return Promise.resolve((_a2 = props2 == null ? void 0 : props2.onBeforeLoad) == null ? void 0 : _a2.call(props2, app));
        },
        beforeMount: (app) => {
          var _a2;
          debug("【%s】子应用完成加载-beforeMount", props2.name);
          return Promise.resolve((_a2 = props2 == null ? void 0 : props2.onBeforeMount) == null ? void 0 : _a2.call(props2, app));
        },
        afterMount: (app) => {
          var _a2;
          debug("【%s】子应用完成DOM挂载-afterMount", props2.name);
          return Promise.resolve((_a2 = props2 == null ? void 0 : props2.onAfterMount) == null ? void 0 : _a2.call(props2, app));
        },
        beforeUnmount: (app) => {
          var _a2;
          debug("【%s】子应用开始DOM卸载-beforeUnmount", props2.name);
          return Promise.resolve((_a2 = props2 == null ? void 0 : props2.onBeforeUnmount) == null ? void 0 : _a2.call(props2, app));
        },
        afterUnmount: (app) => {
          var _a2;
          debug("【%s】子应用完成DOM卸载-afterUnmount", props2.name);
          return Promise.resolve((_a2 = props2 == null ? void 0 : props2.onAfterUnmount) == null ? void 0 : _a2.call(props2, app));
        }
      });
      instance.mountPromise.then(() => {
        loader == null ? void 0 : loader(false);
      });
      ["loadPromise", "bootstrapPromise", "mountPromise"].forEach((key) => {
        const promise = instance == null ? void 0 : instance[key];
        promise == null ? void 0 : promise.catch((e2) => {
          debug("【Error】【%s】子应用在%s中出现异常:%O", props2.name, key, e2);
          collect == null ? void 0 : collect(exports.CollectType.MicroError, e2);
          loader == null ? void 0 : loader(false);
        });
      });
      microAppRef.instance = instance;
    };
    useCollectError(collect, props2 == null ? void 0 : props2.onError);
    vueDemi.onMounted(() => {
      init();
      expose(createWidgetMethods(props2 == null ? void 0 : props2.name, () => {
        return microAppRef.instance;
      }));
    });
    vueDemi.onUnmounted(() => {
      if (microAppRef == null ? void 0 : microAppRef.instance) {
        microAppRef.instance.unmount();
        microAppRef.instance = null;
      }
    });
    vueDemi.watch(() => props2 == null ? void 0 : props2.name, () => {
      init();
    }, {
      deep: true,
      flush: "post"
    });
    vueDemi.watch(() => props2.extra, (value) => {
      var _a, _b, _c;
      if ((_a = microAppRef == null ? void 0 : microAppRef.instance) == null ? void 0 : _a.update) {
        if (((_c = (_b = microAppRef.instance) == null ? void 0 : _b.getStatus) == null ? void 0 : _c.call(_b)) == "MOUNTED") {
          microAppRef.instance.update({
            props: value
          });
        }
      }
    }, {
      deep: true,
      flush: "post"
    });
    return () => {
      return vueDemi.h("div", {
        "ref": "container"
      });
    };
  }
});
exports.DLRoute = DLRoute;
exports.DLRouter = DLRouter;
exports.DLSwitch = DLSwitch;
exports.DLWidget = DLWidget;
exports.__internalGetCurrentRunningApp = getCurrentRunningApp;
exports.addErrorHandler = a;
exports.addGlobalUncaughtErrorHandler = addGlobalUncaughtErrorHandler;
exports.containerIsExists = containerIsExists;
exports.containerRandomId = containerRandomId;
exports.createDebug = createDebug;
exports.createDefaultCollect = createDefaultCollect;
exports.createDowngradContainer = createDowngradContainer;
exports.createWidgetMethods = createWidgetMethods;
exports.fetchPatch = fetchPatch;
exports.filterMicrosByActiveRule = filterMicrosByActiveRule;
exports.findDowngradContainer = findDowngradContainer;
exports.getLifeCycle = getLifeCycle;
exports.getMicroAppList = getMicroAppList;
exports.initGlobalState = initGlobalState;
exports.isNotPureHost = isNotPureHost;
exports.isPromise = isPromise;
exports.judgeActivedMicroApp = judgeActivedMicroApp;
exports.loadMicroApp = loadMicroApp;
exports.pathToActiveWhen = pathToActiveWhen;
exports.polyfillCustomEvent = polyfillCustomEvent;
exports.prefetchApps = prefetchImmediately;
exports.registerMicroApps = registerMicroApps;
exports.removeErrorHandler = c;
exports.removeGlobalUncaughtErrorHandler = removeGlobalUncaughtErrorHandler;
exports.runAfterFirstMounted = runAfterFirstMounted;
exports.runDefaultMountEffects = runDefaultMountEffects;
exports.sanitizeActiveWhen = sanitizeActiveWhen;
exports.setDefaultMountApp = setDefaultMountApp;
exports.start = start;
