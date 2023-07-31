import {
  createDebug,
  filterMicrosByActiveRule,
  judgeActivedMicroApp,
  type ISwitchProps,
  type RegistrableMicro,
  type AppMetadata,
  type MicroAppStateActions,
  initGlobalState,
  createDefaultCollect,
  getLifeCycle,
  setDefaultMountApp,
  start,
  registerMicroApps,
  containerIsExists,
  createDowngradContainer,
  findDowngradContainer,
  type ActivityFn,
} from '@ks-dilu/core';
import useCollectError from '@/Utils/useCollectError';

import {
  defineComponent,
  isVNode,
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  type VNode,
} from 'vue';
import { RouteAppContainer } from '@/Container';
import { Teleport } from '@/Teleport';

const debug = createDebug('DL:Vue-Switch');
const defaultCollect = createDefaultCollect(debug);

const microAppStateActions: MicroAppStateActions = initGlobalState({});

export default defineComponent({
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
  ],
  setup(props: ISwitchProps, { slots }) {
    const registrableMicros = ref<Array<RegistrableMicro>>([]);
    const downgradMicros = ref<Array<(x: any) => VNode[]>>([]);
    const hasActivedMicroApp = ref(true);

    const firstMountListener = () => {
      debug('第一个微应用完成挂载（Mount）');
      props?.onFirstMount?.();
      window.removeEventListener('single-spa:first-mount', firstMountListener);
    };

    onBeforeMount(() => {
      window.addEventListener('single-spa:first-mount', firstMountListener);
    });
    onUnmounted(() => {
      window.removeEventListener('single-spa:first-mount', firstMountListener);
    });

    const init = () => {
      let micros: Array<RegistrableMicro> = [];
      let notFoundMicros: Array<(x: any) => VNode[]> = [];

      slots?.default?.().forEach((vNode: any) => {
        if (vNode?.type?.name === 'DLRoute') {
          const vNodeProps = vNode.props;
          if (vNodeProps?.name && vNodeProps?.entry && vNodeProps?.activeRule) {
            const micro: RegistrableMicro = {
              name: vNodeProps.name,
              entry: vNodeProps.entry,
              container: `#${props.containerId}`,
              activeRule: vNodeProps.activeRule,
              loader: props?.loader,
              props: {
                diluRouteActiveRule: vNodeProps.activeRule,
                ...props?.extra,
                ...vNodeProps?.extras,
                ...vNodeProps?.extra,
              },
            };
            micros.push(micro);
          } else if (vNode?.children?.default) {
            notFoundMicros.push((slotProps: any) => {
              return vNode?.children?.default(slotProps);
            });
          }
        } else {
          debug('DLSwitch组件的Slots只能使用DLRoute：%O', vNode);
        }
      });
      debug('完成子应用信息的收集：%O', micros);

      micros = filterMicrosByActiveRule(micros, props?.activeFilter);
      debug('完成子应用激活规则去重过滤：%O', micros);

      registrableMicros.value = micros;
      downgradMicros.value = notFoundMicros;
      debug('初始化时，判断是否存在激活的应用');
      hasActivedMicroApp.value = judgeActivedMicroApp(micros);
      debug('存在%d个兜底组件', notFoundMicros.length);

      let lifeCycle: Record<string, (app: AppMetadata) => void> = getLifeCycle(
        (lifeCycleName: string, app: AppMetadata) => {
          if (typeof props?.[lifeCycleName] === 'function') {
            props[lifeCycleName](app);
          }
        },
        props?.collect,
      );

      registerMicroApps(micros, lifeCycle);

      debug('完成子应用注册');

      if (props?.defaultMountAppLink) {
        debug('设置默认进入的子应用：【%s】', props?.defaultMountAppLink);
        setDefaultMountApp(props.defaultMountAppLink);
      }
      start(props?.advanced as any);
    };

    const beforeRoutingEventListener = (e: any) => {
      const { newUrl, oldUrl } = e.detail;
      if (newUrl != oldUrl && registrableMicros.value.length && registrableMicros.value.some(m => (m.activeRule as ActivityFn)(window.location))) {
        debug('通过single-spa:before-routing-event 调用 judgeActivedMicroApp');
        hasActivedMicroApp.value = judgeActivedMicroApp(registrableMicros.value);
      }
    };

    // 在生命周期函数或激活函数期间每次抛出错误时，收集异常上报;全局的未捕获异常上报
    useCollectError(props?.collect || defaultCollect, props?.onError);
    onMounted(() => {
      // 为子应用的容器添加兜底逻辑的容器
      if (props?.containerId && containerIsExists(props.containerId)) {
        debug('为子应用容器【%s】创建兜底DOM', props.containerId);
        createDowngradContainer(props.containerId);
      } else if (props.isOccupyOuterContainer) {
        debug('没有找到指定的子应用的容器：【%s】', props.containerId);
      }

      init();
      window.addEventListener('single-spa:before-routing-event', beforeRoutingEventListener);
      window.addEventListener('single-spa:first-mount', firstMountListener);
    });
    onUnmounted(() => {
      microAppStateActions.offGlobalStateChange();
      window.removeEventListener('single-spa:first-mount', firstMountListener);
      window.removeEventListener('single-spa:before-routing-event', beforeRoutingEventListener);
    });

    watch(
      () => props.extra,
      (value) => {
        microAppStateActions.setGlobalState(value || {});
      },
    );

    return () => {
      return (
        <div>
          <RouteAppContainer
            containerIdentity={props.isOccupyOuterContainer ? '' : props.containerId}
          ></RouteAppContainer>
          {!!registrableMicros.value.length && !hasActivedMicroApp.value ? (
            <Teleport to={findDowngradContainer(props.containerId!)!}>
              {downgradMicros?.value?.map((slot: any) => {
                const state: any = {
                  isActived: hasActivedMicroApp.value,
                };
                if (!registrableMicros.value.length || hasActivedMicroApp.value) {
                  state.hasAuth = props.activeFilter ? props.activeFilter?.(window.location) : true;
                }

                return slot?.({
                  state,
                  list: registrableMicros.value,
                });
              })}
            </Teleport>
          ) : null}
        </div>
      );
    };
  },
});
