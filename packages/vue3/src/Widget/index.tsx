import {
  createDebug,
  createDefaultCollect,
  polyfillCustomEvent,
  type AppMetadata,
  loadMicroApp,
  type MicroApp,
  createWidgetMethods,
  type IWidgetProps,
  CollectType,
  type Entry,
  type Advanced,
} from '@ks-dilu/core';
import { defineComponent, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import useCollectError from '@/Utils/useCollectError';

const debug = createDebug('DL:Vue-Widget');

const defaultCollect = createDefaultCollect(debug);
export const DLWidget = defineComponent({
  props: [
    'name',
    'entry',
    'extra',
    'advanced',
    'collect',
    'loader',
    'onBeforeLoad',
    'onBeforeMount',
    'onAfterMount',
    'onBeforeUnmount',
    'onAfterUnmount',
    'onError',
  ],
  setup(props: IWidgetProps, { expose, slots }) {
    const container = ref<HTMLDivElement | null>(null);
    const { collect = defaultCollect, loader = (_x: boolean) => {} } = props;

    const microAppRef = reactive<{ instance: MicroApp | null }>({
      instance: null,
    });

    const init = () => {
      loader?.(true);
      debug('【%s】子应用开始初始化', props.name);
      const instance = loadMicroApp(
        {
          name: props.name,
          entry: props.entry,
          container: container?.value as HTMLDivElement,
          props: {
            ...props.extra,
            isDLWidget: true,
          },
        },
        (props?.advanced || {}) as any,
        {
          beforeLoad: (app: AppMetadata) => {
            debug('【%s】子应用开始加载-beforeLoad', props.name);
            return Promise.resolve(props?.onBeforeLoad?.(app));
          },
          beforeMount: (app: AppMetadata) => {
            debug('【%s】子应用完成加载-beforeMount', props.name);
            return Promise.resolve(props?.onBeforeMount?.(app));
          },
          afterMount: (app: AppMetadata) => {
            debug('【%s】子应用完成DOM挂载-afterMount', props.name);

            return Promise.resolve(props?.onAfterMount?.(app));
          },
          beforeUnmount: (app: AppMetadata) => {
            debug('【%s】子应用开始DOM卸载-beforeUnmount', props.name);

            return Promise.resolve(props?.onBeforeUnmount?.(app));
          },
          afterUnmount: (app: AppMetadata) => {
            debug('【%s】子应用完成DOM卸载-afterUnmount', props.name);
            return Promise.resolve(props?.onAfterUnmount?.(app));
          },
        },
      );
      instance.mountPromise.then(() => {
        loader?.(false);
      });
      ['loadPromise', 'bootstrapPromise', 'mountPromise'].forEach((key) => {
        // @ts-ignore
        const promise = instance?.[key];
        promise?.catch((e: any) => {
          debug('【Error】【%s】子应用在%s中出现异常:%O', props.name, key, e);
          collect?.(CollectType.MicroError, e);
          loader?.(false);
        });
      });
      microAppRef.instance = instance;
      console.log(slots);
    };

    useCollectError(collect, props?.onError);
    onMounted(() => {
      init();
    });

    expose(
      createWidgetMethods(props?.name, () => {
        return microAppRef.instance as MicroApp;
      }),
    );

    onUnmounted(() => {
      if (microAppRef?.instance) {
        microAppRef.instance.unmount();
        // @ts-ignore
        microAppRef.instance = null;
      }
    });

    watch(
      () => props?.name,
      () => {
        init();
      },
      {
        deep: true,
        flush: 'post',
      },
    );

    watch(
      () => props.extra,
      (value) => {
        if (microAppRef?.instance?.update) {
          if (microAppRef.instance?.getStatus?.() == 'MOUNTED') {
            microAppRef.instance.update({ props: value });
          }
        }
      },
      {
        deep: true,
        flush: 'post',
      },
    );
    return () => {
      return <div ref={container}></div>;
    };
  },
});
