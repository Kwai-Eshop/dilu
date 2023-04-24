import { type Advanced, type CollectLogFn, type LifeCycleEvent } from '@ks-dilu/core';
import { type Prop, type PropType } from 'vue';

export const baseProps = {
  extra: {
    type: Object,
  },
  advanced: {
    type: Object as PropType<Advanced>,
  },
  collect: Function as PropType<CollectLogFn>,
  loader: {
    type: Function as PropType<(loading: boolean) => void>,
  },
  onBeforeLoad: Function as PropType<LifeCycleEvent>,
  onBeforeMount: Function as PropType<LifeCycleEvent>,
  onAfterMount: Function as PropType<LifeCycleEvent>,
  onBeforeUnmount: Function as PropType<LifeCycleEvent>,
  onAfterUnmount: Function as PropType<LifeCycleEvent>,
  onError: Function as PropType<(...args: any[]) => void>,
};
