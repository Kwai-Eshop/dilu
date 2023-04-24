import type { Activity, AppMetadata } from '@ks-dilu/core';
export interface RouteAppProps extends Partial<AppMetadata> {
    activeRule?: Activity;
    extra?: Record<string, any>;
    extras?: Record<string, any>;
}
export declare const DLRoute: import("vue").DefineComponent<Readonly<{
    name?: any;
    entry?: any;
    extra?: any;
    activeRule?: any;
    extras?: any;
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[] | null | undefined, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<Readonly<{
    name?: any;
    entry?: any;
    extra?: any;
    activeRule?: any;
    extras?: any;
}>>>, {
    readonly name?: any;
    readonly entry?: any;
    readonly extra?: any;
    readonly activeRule?: any;
    readonly extras?: any;
}>;
