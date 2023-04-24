import type { Activity, AppMetadata } from '@ks-dilu/core';
import { defineComponent } from 'vue';

export interface RouteAppProps extends Partial<AppMetadata> {
  activeRule?: Activity;
  extra?: Record<string, any>;
  extras?: Record<string, any>;
}
export const DLRoute = defineComponent({
  props: ['name', 'entry', 'activeRule', 'extra', 'extras'],
  name: 'DLRoute',
  setup(props: RouteAppProps, { slots }) {
    return () => {
      if (!props.name || !props.entry || !props?.activeRule) {
        return slots?.default?.();
      }
      return null;
    };
  },
});
