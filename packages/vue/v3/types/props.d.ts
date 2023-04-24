import { type Advanced, type CollectLogFn, type LifeCycleEvent } from '@ks-dilu/core';
import { type PropType } from 'vue';
export declare const baseProps: {
    extra: {
        type: ObjectConstructor;
    };
    advanced: {
        type: PropType<Advanced>;
    };
    collect: PropType<CollectLogFn>;
    loader: {
        type: PropType<(loading: boolean) => void>;
    };
    onBeforeLoad: PropType<LifeCycleEvent>;
    onBeforeMount: PropType<LifeCycleEvent>;
    onAfterMount: PropType<LifeCycleEvent>;
    onBeforeUnmount: PropType<LifeCycleEvent>;
    onAfterUnmount: PropType<LifeCycleEvent>;
    onError: PropType<(...args: any[]) => void>;
};
