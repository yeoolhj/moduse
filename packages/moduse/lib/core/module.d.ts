import { DefineItem, DefineType, ModuleCreate, UnionToIntersectionType } from "./typings";
import { useDefineHandle } from "./use";
export declare class ModuleRoot {
    protected options?: {
        [name: string]: any;
    } | undefined;
    static create: ModuleCreate<never>;
    static define: <K extends typeof ModuleRoot, Define extends DefineType<unknown>>(this: K, define: Define & ThisType<InstanceType<K>>) => Define;
    constructor(options?: {
        [name: string]: any;
    } | undefined);
    protected use<T extends DefineType<unknown>>(this: ModuleRoot, defines: (T & ThisType<this>) | T[], options?: {
        createOptionsKey?: string;
        handle?: typeof useDefineHandle;
    }): UnionToIntersectionType<T>;
    protected createUse<This extends ModuleRoot, K extends keyof This>(this: This, createOptionsKey: K, options?: {
        handle?: (item: [string, DefineItem<This[K]>]) => any;
    }): <T extends DefineType<unknown>>(defines: T | T[]) => UnionToIntersectionType<T>;
}
export declare function createInstance<K>(): ModuleCreate<K>;
