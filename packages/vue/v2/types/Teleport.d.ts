import { type ExtractPropTypes, type PropType } from '@vue/composition-api';
export declare const Teleport: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<() => JSX.Element> & import("@vue/composition-api").Data, {}, {}, {
    to: {
        type: PropType<string | HTMLElement>;
    };
}, ExtractPropTypes<{
    to: {
        type: PropType<string | HTMLElement>;
    };
}>> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{} & {
    to?: string | HTMLElement | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<() => JSX.Element>, import("@vue/composition-api").Data, {}, {}, {}, {}, {}, {} & {
    to?: string | HTMLElement | undefined;
}, {}, true>);
