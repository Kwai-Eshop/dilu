import { RouteAppContainer } from '@/Container';
import { containerRandomId, createDebug, type ISwitchProps } from '@ks-dilu/core';
import { computed, defineComponent } from 'vue';
import BootstrapComponent from './Bootstrap';

const debug = createDebug('DL:Vue-Switch');

export const DLSwitch = defineComponent({
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
  inheritAttrs: false,
  setup(props: ISwitchProps, { slots }) {
    const isUseOuterContainer = computed(() => {
      let flag = false;
      if (props.isOccupyOuterContainer) {
        if (props.containerId) {
          flag = true;
        } else {
          debug('isOccupyOuterContainer 为true时没有设置containerId，所以不启用外部容器');
          flag = false;
        }
      } else {
        flag = false;
      }
      debug('是否启用使用外部容器的能力: 【%s】', flag);
      return flag;
    });
    const wrapperId = computed(() => {
      if (props.containerId) {
        return props.containerId;
      }
      return containerRandomId;
    });

    return () => (
      <BootstrapComponent
        {...props}
        containerId={wrapperId.value}
        isOccupyOuterContainer={isUseOuterContainer.value}
      >
        {{
          default: (slotProps: any) => {
            return slots?.default?.(slotProps);
          },
        }}
      </BootstrapComponent>
    );
  },
});
