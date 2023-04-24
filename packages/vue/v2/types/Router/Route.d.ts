import type { Activity, AppMetadata } from '@ks-dilu/core';
export interface RouteAppProps extends Partial<AppMetadata> {
    activeRule?: Activity;
    extra?: Record<string, any>;
    extras?: Record<string, any>;
}
export declare const DLRoute: import("vue").ComponentOptions<import("vue").default, import("@vue/composition-api").ShallowUnwrapRef<() => import("vue").VNode[] | null | undefined> & import("@vue/composition-api").Data, {}, {}, string[], import("@vue/composition-api").ExtractPropTypes<string[]>> & Omit<import("vue").VueConstructor<import("vue").default>, never> & (new (...args: any[]) => import("@vue/composition-api").ComponentRenderProxy<{
    [x: number]: string;
} & {
    [Symbol.iterator]?: IterableIterator<string> | undefined;
    [Symbol.unscopables]?: {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    } | undefined;
    length?: number | undefined;
    toString?: string | undefined;
    toLocaleString?: string | undefined;
    pop?: string | undefined;
    push?: number | undefined;
    concat?: string[] | undefined;
    join?: string | undefined;
    reverse?: string[] | undefined;
    shift?: string | undefined;
    slice?: string[] | undefined;
    sort?: string[] | undefined;
    splice?: {
        (start: number, deleteCount?: number | undefined): string[];
        (start: number, deleteCount: number, ...items: string[]): string[];
    } | undefined;
    unshift?: number | undefined;
    indexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    lastIndexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    every?: {
        <S extends string>(predicate: (value: string, index: number, array: string[]) => value is S, thisArg?: any): this is S[];
        (predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): boolean;
    } | undefined;
    some?: ((predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => boolean) | undefined;
    forEach?: ((callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void) | undefined;
    map?: (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[]) | undefined;
    filter?: {
        <S_1 extends string>(predicate: (value: string, index: number, array: string[]) => value is S_1, thisArg?: any): S_1[];
        (predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): string[];
    } | undefined;
    reduce?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U_1>(callbackfn: (previousValue: U_1, currentValue: string, currentIndex: number, array: string[]) => U_1, initialValue: U_1): U_1;
    } | undefined;
    reduceRight?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U_2>(callbackfn: (previousValue: U_2, currentValue: string, currentIndex: number, array: string[]) => U_2, initialValue: U_2): U_2;
    } | undefined;
    find?: {
        <S_2 extends string>(predicate: (this: void, value: string, index: number, obj: string[]) => value is S_2, thisArg?: any): S_2 | undefined;
        (predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any): string | undefined;
    } | undefined;
    findIndex?: ((predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any) => number) | undefined;
    fill?: ((value: string, start?: number | undefined, end?: number | undefined) => string[]) | undefined;
    copyWithin?: ((target: number, start: number, end?: number | undefined) => string[]) | undefined;
    entries?: IterableIterator<[number, string]> | undefined;
    keys?: IterableIterator<number> | undefined;
    values?: IterableIterator<string> | undefined;
    includes?: ((searchElement: string, fromIndex?: number | undefined) => boolean) | undefined;
}, import("@vue/composition-api").ShallowUnwrapRef<() => import("vue").VNode[] | null | undefined>, import("@vue/composition-api").Data, {}, {}, {}, {}, {}, {
    [x: number]: string;
} & {
    [Symbol.iterator]?: IterableIterator<string> | undefined;
    [Symbol.unscopables]?: {
        copyWithin: boolean;
        entries: boolean;
        fill: boolean;
        find: boolean;
        findIndex: boolean;
        keys: boolean;
        values: boolean;
    } | undefined;
    length?: number | undefined;
    toString?: string | undefined;
    toLocaleString?: string | undefined;
    pop?: string | undefined;
    push?: number | undefined;
    concat?: string[] | undefined;
    join?: string | undefined;
    reverse?: string[] | undefined;
    shift?: string | undefined;
    slice?: string[] | undefined;
    sort?: string[] | undefined;
    splice?: {
        (start: number, deleteCount?: number | undefined): string[];
        (start: number, deleteCount: number, ...items: string[]): string[];
    } | undefined;
    unshift?: number | undefined;
    indexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    lastIndexOf?: ((searchElement: string, fromIndex?: number | undefined) => number) | undefined;
    every?: {
        <S extends string>(predicate: (value: string, index: number, array: string[]) => value is S, thisArg?: any): this is S[];
        (predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): boolean;
    } | undefined;
    some?: ((predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any) => boolean) | undefined;
    forEach?: ((callbackfn: (value: string, index: number, array: string[]) => void, thisArg?: any) => void) | undefined;
    map?: (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[]) | undefined;
    filter?: {
        <S_1 extends string>(predicate: (value: string, index: number, array: string[]) => value is S_1, thisArg?: any): S_1[];
        (predicate: (value: string, index: number, array: string[]) => unknown, thisArg?: any): string[];
    } | undefined;
    reduce?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U_1>(callbackfn: (previousValue: U_1, currentValue: string, currentIndex: number, array: string[]) => U_1, initialValue: U_1): U_1;
    } | undefined;
    reduceRight?: {
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string): string;
        (callbackfn: (previousValue: string, currentValue: string, currentIndex: number, array: string[]) => string, initialValue: string): string;
        <U_2>(callbackfn: (previousValue: U_2, currentValue: string, currentIndex: number, array: string[]) => U_2, initialValue: U_2): U_2;
    } | undefined;
    find?: {
        <S_2 extends string>(predicate: (this: void, value: string, index: number, obj: string[]) => value is S_2, thisArg?: any): S_2 | undefined;
        (predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any): string | undefined;
    } | undefined;
    findIndex?: ((predicate: (value: string, index: number, obj: string[]) => unknown, thisArg?: any) => number) | undefined;
    fill?: ((value: string, start?: number | undefined, end?: number | undefined) => string[]) | undefined;
    copyWithin?: ((target: number, start: number, end?: number | undefined) => string[]) | undefined;
    entries?: IterableIterator<[number, string]> | undefined;
    keys?: IterableIterator<number> | undefined;
    values?: IterableIterator<string> | undefined;
    includes?: ((searchElement: string, fromIndex?: number | undefined) => boolean) | undefined;
}, {
    [x: number]: string;
}, true>);
