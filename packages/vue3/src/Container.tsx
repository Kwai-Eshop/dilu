import { defineComponent, onMounted, ref, type ExtractPropTypes, unref, toRaw } from 'vue';

export interface AppContainerProps {
  containerIdentity: string;
}

// export type AppContainerProps = ExtractPropTypes<typeof props>;

export const RouteAppContainer = defineComponent({
  props: ['containerIdentity'],
  setup(props: AppContainerProps, { slots, expose, ...rest }) {
    const { containerIdentity: container } = props || {};
    const divDOM = ref<HTMLDivElement | null>(null);

    console.log(props);
    const identity: Record<string, any> = {};

    if (typeof container === 'string') {
      if (container.startsWith('#')) {
        identity.id = container.substring(1);
      } else if (container.startsWith('.')) {
        identity.id = container.substring(1);
      } else if (container) {
        identity.id = container;
      }
    }
    console.log(slots);
    console.log(rest);

    expose({
      dom: divDOM,
    });
    return () => (
      <div {...identity} ref={divDOM}>
        {slots?.default?.()}
      </div>
    );
  },
});
