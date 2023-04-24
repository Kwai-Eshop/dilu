// @ts-ignore
export const isMicro = () => !!window.__POWERED_BY_QIANKUN__;

// You can polyfill the CustomEvent() constructor functionality in Internet Explorer 9 and higher with the following code:
export const polyfillCustomEvent = () => {
  try {
    new window.CustomEvent('_test_support_custom_event');
  } catch (e) {
    const CustomEvent = function (event: any, params: any) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      };
      const evt = document.createEvent('CustomEvent');
      // @ts-ignore
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = window.Event.prototype;
    // @ts-ignore
    window.CustomEvent = CustomEvent;
  }
};
