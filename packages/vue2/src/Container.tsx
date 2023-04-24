import { defineComponent, getCurrentInstance } from '@vue/composition-api';

export interface AppContainerProps {
  containerIdentity: string;
}

// export type AppContainerProps = ExtractPropTypes<typeof props>;

export const RouteAppContainer = defineComponent({
  props: ['containerIdentity'],
  setup(props: AppContainerProps, { slots }) {
    const { containerIdentity: container } = props || {};

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

    return () => <div {...{ attrs: identity }}>{slots?.default?.()}</div>;
  },
});
