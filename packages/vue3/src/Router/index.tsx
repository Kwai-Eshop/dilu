import {
  CollectType,
  FetchStatus,
  createDebug,
  type ISwitchProps,
  type MicroList,
  createDefaultCollect,
  MicroType,
  type MicroInfo,
} from '@ks-dilu/core';
import { defineComponent, onBeforeMount, ref, toRefs } from 'vue';
import { DLSwitch } from './Switch';
import { DLRoute } from './Route';

const debug = createDebug('DL:Vue-Router');
const defaultCollect = createDefaultCollect(debug);

export interface DLRouterProps extends ISwitchProps {
  fetchMicros: () => Promise<MicroList>;
}
export const DLRouter = defineComponent({
  name: 'DLRouter',
  components: {
    DLSwitch,
    DLRoute,
  },
  props: [
    'extra',
    'advanced',
    'collect',
    'loader',
    'defaultMountAppLink',
    'isOccupyOuterContainer',
    'containerId',
    'activeFilter',
    'onFirstMount',
    'onBeforeLoad',
    'onBeforeMount',
    'onAfterMount',
    'onBeforeUnmount',
    'onAfterUnmount',
    'onError',
    'fetchMicros',
  ],
  setup(props: DLRouterProps, { slots }) {
    const fetchStatus = ref(FetchStatus.Init);
    const microList = ref<MicroList>([]);
    const { collect, fetchMicros, ...restProps } = toRefs(props);

    onBeforeMount(async () => {
      fetchStatus.value = FetchStatus.Fetching;
      try {
        const micros = await props?.fetchMicros?.();
        debug('获取到子应用列表: %O', micros);
        microList.value = micros;
        fetchStatus.value = FetchStatus.Fetched;
      } catch (e: any) {
        (collect?.value || defaultCollect)(CollectType.ERROR, e);
        debug('获取到子应用列表失败: %O', e);
        fetchStatus.value = FetchStatus.Error;
      }
    });

    return () =>
      fetchStatus.value == FetchStatus.Fetched ? (
        <DLSwitch {...props} collect={collect?.value || defaultCollect}>
          {{
            default: () => {
              let routes = microList.value?.map?.((micro: MicroInfo) => {
                if (micro.type === MicroType.Route) {
                  return <DLRoute {...micro} key={micro.name}></DLRoute>;
                }
                return null;
              });

              if (slots.default) {
                routes.push(
                  <DLRoute>
                    {{
                      default: (slotProps: any) => slots?.default?.(slotProps),
                    }}
                  </DLRoute>,
                );
              }

              return routes;
            },
          }}
        </DLSwitch>
      ) : null;
  },
});
