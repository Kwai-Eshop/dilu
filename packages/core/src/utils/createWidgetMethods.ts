import { MicroApp } from 'qiankun';
import { isPromise, createDebug } from './tools';

/**
 * 组件级应用可以使用的Method
 */
export enum WidgetAppMethods {
  mount = 'mount',
  unmount = 'unmount',
  getStatus = 'getStatus',
  loadPromise = 'loadPromise',
  bootstrapPromise = 'bootstrapPromise',
  mountPromise = 'mountPromise',
  unmountPromise = 'unmountPromise',
  update = 'update',
}

const debug = createDebug('DL:Core-createWidgetMethods');

export const createWidgetMethods = (
  widgetName: string,
  getMicroAppInstance: MicroApp | (() => MicroApp),
) => {
  let instanceMethods: MicroApp = {} as MicroApp;

  Object.keys(WidgetAppMethods).forEach((attribute) => {
    Object.defineProperty(instanceMethods, attribute, {
      enumerable: true,
      get() {
        let instance;
        if (typeof getMicroAppInstance == 'function') {
          instance = getMicroAppInstance();
        } else {
          instance = getMicroAppInstance;
        }
        const attributeValue: any = instance?.[attribute];

        if (attribute.endsWith('Promise')) {
          if (attributeValue) {
            return attributeValue;
          } else {
            debug('【%s】 子应用实例上没有 【%s】 属性或方法 %O', widgetName, attribute, instance);
            return Promise.resolve();
          }
        } else {
          if ((attributeValue && typeof attributeValue == 'function') || attribute == 'update') {
            return (args: any) => {
              debug('【%s】 子应用的 【%s】 方法被调用', widgetName, attribute);
              let returnValue = instance?.[attribute]?.(args);
              if (isPromise(returnValue)) {
                return returnValue
                  .then(() => {})
                  .catch((e) => {
                    debug(
                      '【Error】【%s】 子应用调用 【%s】 出现异常 %O',
                      widgetName,
                      attribute,
                      e,
                    );
                  });
              }
              return returnValue;
            };
          } else {
            return (args: any) => {
              debug(
                '【%s】 子应用实例上没有 【%s】 属性或方法 %O',
                widgetName,
                attribute,
                instance,
              );
              return args;
            };
          }
        }
      },
    });
  });
  return instanceMethods;
};
