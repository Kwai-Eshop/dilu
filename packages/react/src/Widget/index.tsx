import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  createDebug,
  createDefaultCollect,
  polyfillCustomEvent,
  AppMetadata,
  loadMicroApp,
  MicroApp,
  createWidgetMethods,
  IWidgetProps,
  CollectType,
} from '@ks-dilu/core';
import { WidgetAppContainer } from '@/Container';
import useCollectError from '@/Utils/useCollectError';

export type WidgetProps = IWidgetProps;

polyfillCustomEvent();

const debug = createDebug('DL:Widget');

const defaultCollect = createDefaultCollect(debug);

const MicroInstanceCompletedEventName = 'DLMicroInstanceComplated' + Math.random() + Date.now();

const Bootstrap = (props: WidgetProps & { container?: HTMLDivElement }) => {
  const {
    name,
    entry,
    container,
    loader = (_loading: boolean) => {},
    advanced,
    collect = defaultCollect,
    extra = {},
    onError,
  } = props;

  useCollectError(collect, onError);

  useEffect(() => {
    let microAppInstance: MicroApp;
    if (container) {
      loader(true);
      debug('【%s】子应用开始初始化', name);
      microAppInstance = loadMicroApp(
        {
          name,
          entry,
          container,
          props: {
            ...extra,
            isDLWidget: true,
          },
        },
        advanced,
        {
          beforeLoad: (app: AppMetadata) => {
            debug('【%s】子应用开始加载-beforeLoad', name);
            return Promise.resolve(props?.onBeforeLoad?.(app));
          },
          beforeMount: (app: AppMetadata) => {
            debug('【%s】子应用完成加载-beforeMount', name);
            return Promise.resolve(props?.onBeforeMount?.(app));
          },
          afterMount: (app: AppMetadata) => {
            debug('【%s】子应用完成DOM挂载-afterMount', name);

            return Promise.resolve(props?.onAfterMount?.(app));
          },
          beforeUnmount: (app: AppMetadata) => {
            debug('【%s】子应用开始DOM卸载-beforeUnmount', name);

            return Promise.resolve(props?.onBeforeUnmount?.(app));
          },
          afterUnmount: (app: AppMetadata) => {
            debug('【%s】子应用完成DOM卸载-afterUnmount', name);
            return Promise.resolve(props?.onAfterUnmount?.(app));
          },
        },
      );

      microAppInstance.mountPromise.then(() => {
        loader(false);
        debug('在mountPromise中【%s】子应用触发实例挂载Ref', name);
        const customEvent = new CustomEvent(MicroInstanceCompletedEventName + name, {
          detail: {
            instance: microAppInstance,
            name,
          },
        });
        // 子应用只有完成挂载，子应用实例上才会存在update，所以要将其放在afterMount中触发自定义事件，完成通信
        document.dispatchEvent(customEvent);
      });

      ['loadPromise', 'bootstrapPromise', 'mountPromise'].forEach((key) => {
        const promise = microAppInstance?.[key];
        promise?.catch((e: any) => {
          debug('【Error】【%s】子应用在%s中出现异常:%O', name, key, e);
          collect(CollectType.MicroError, e);
          loader(false);
        });
      });
    }
    return () => {
      if (microAppInstance) {
        microAppInstance?.unmount();
        //@ts-ignore
        microAppInstance = null;
      }
    };
  }, [container, name, entry]);

  return <></>;
};

export const DLWidget = React.forwardRef<MicroApp, WidgetProps>(
  (props: WidgetProps, ref: React.ForwardedRef<MicroApp>) => {
    const [container, setContainer] = useState<HTMLDivElement>();
    const [instance, setInstance] = useState<MicroApp>(
      createWidgetMethods(props.name, {} as MicroApp),
    );
    const { extra, name } = props;
    useEffect(() => {
      const handler: EventListenerOrEventListenerObject = (e: any) => {
        debug('【%s】 子应用实例化完成 %O', e?.detail?.name);
        setInstance(createWidgetMethods(e?.detail?.name, e?.detail?.instance));
      };
      const eventName = MicroInstanceCompletedEventName + name;
      document.addEventListener(eventName, handler);
      return () => {
        debug('子应用实例卸载');
        // @ts-ignore
        setInstance(null);
        document.removeEventListener(eventName, handler);
      };
    }, []);

    useImperativeHandle<unknown, MicroApp>(
      ref,
      () => {
        return instance;
      },
      [instance],
    );

    useEffect(() => {
      if (instance?.update) {
        if (instance?.getStatus?.() == 'MOUNTED') {
          instance?.update({ props: extra });
        }
      }
    }, [extra, instance]);

    return (
      <WidgetAppContainer
        ref={(ele: HTMLDivElement) => {
          setContainer(ele);
        }}
      >
        <Bootstrap container={container} {...props}></Bootstrap>
      </WidgetAppContainer>
    );
  },
);
