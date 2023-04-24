import { createDebug } from '@ks-dilu/core';
import {
  defineComponent,
  ref,
  type ExtractPropTypes,
  type PropType,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
  watchPostEffect,
} from 'vue';
const debug = createDebug('DL:Vue-Teleport');

const props = {
  to: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
};

type TeleportProps = ExtractPropTypes<typeof props>;

export const Teleport = defineComponent({
  props,

  setup(props: TeleportProps, { slots }) {
    const el = ref<any>(null);

    let microContainer: HTMLElement;
    let originStyle: CSSStyleDeclaration;
    let container: HTMLElement | null | undefined;

    onMounted(() => {
      container = typeof props.to === 'string' ? document.getElementById(props.to) : props.to;
      debug('挂载兜底降级组件，降级容器%O：', container);
      console.log(el.value);
      if (container) {
        container?.appendChild?.(el?.value!);
      }

      try {
        if (container && container?.dataset?.dlDowngradContainer) {
          microContainer = document.getElementById(container?.dataset?.dlDowngradContainer)!;
          if (microContainer) {
            originStyle = microContainer.style;
            microContainer.style.opacity = '0';
            microContainer.style.overflow = 'hidden';
            microContainer.style.height = '0';
          }
        }
      } catch (e) {
        debug('【Error】设置子应用容器Style异常：%O', e);
      }
    });

    onUnmounted(() => {
      while (container?.firstChild) {
        container?.removeChild(container?.firstChild);
      }
      debug('卸载载兜底降级组件, 降级容器%O:', container);
      if (microContainer) {
        //@ts-ignore
        microContainer.style = { ...originStyle };
      }
    });

    return () => {
      return (
        <div
          ref={(_el) => {
            el.value = _el;
          }}
        >
          {slots?.default?.()}
        </div>
      );
    };
  },
});
