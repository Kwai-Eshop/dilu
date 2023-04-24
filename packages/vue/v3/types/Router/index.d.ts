import { type ISwitchProps, type MicroList } from '@ks-dilu/core';
export interface DLRouterProps extends ISwitchProps {
    fetchMicros: () => Promise<MicroList>;
}
export declare const DLRouter: import("vue").DefineComponent<Readonly<{
    onError?: any;
    extra?: any;
    advanced?: any;
    collect?: any;
    loader?: any;
    onBeforeLoad?: any;
    onBeforeMount?: any;
    onAfterMount?: any;
    onBeforeUnmount?: any;
    onAfterUnmount?: any;
    defaultMountAppLink?: any;
    isOccupyOuterContainer?: any;
    containerId?: any;
    activeFilter?: any;
    onFirstMount?: any;
    fetchMicros?: any;
}>, () => JSX.Element | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    onError?: any;
    extra?: any;
    advanced?: any;
    collect?: any;
    loader?: any;
    onBeforeLoad?: any;
    onBeforeMount?: any;
    onAfterMount?: any;
    onBeforeUnmount?: any;
    onAfterUnmount?: any;
    defaultMountAppLink?: any;
    isOccupyOuterContainer?: any;
    containerId?: any;
    activeFilter?: any;
    onFirstMount?: any;
    fetchMicros?: any;
}>>>, {
    readonly onError?: any;
    readonly extra?: any;
    readonly advanced?: any;
    readonly collect?: any;
    readonly loader?: any;
    readonly onBeforeLoad?: any;
    readonly onBeforeMount?: any;
    readonly onAfterMount?: any;
    readonly onBeforeUnmount?: any;
    readonly onAfterUnmount?: any;
    readonly defaultMountAppLink?: any;
    readonly isOccupyOuterContainer?: any;
    readonly containerId?: any;
    readonly activeFilter?: any;
    readonly onFirstMount?: any;
    readonly fetchMicros?: any;
}>;
