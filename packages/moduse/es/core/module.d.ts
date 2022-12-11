import { CreateInstance, DefineItem, DefineType, UseDefine } from "./typings";
export declare abstract class ModuleRoot {
    options?: {
        [name: string]: any;
    } | undefined;
    static create: CreateInstance<unknown>;
    static define: <K extends typeof ModuleRoot, Define extends DefineType<unknown>>(this: K, define: Define & ThisType<InstanceType<K>>) => Define;
    constructor(options?: {
        [name: string]: any;
    } | undefined);
    protected use: UseDefine<DefineType<any>>;
}
export declare function createDefine<T = DefineType<unknown>>(handle?: (define: T) => T): <K extends typeof ModuleRoot, Define extends T>(this: K, define: Define & ThisType<InstanceType<K>>) => Define;
export declare function createInstance<K>(): CreateInstance<K>;
export declare function createUse<Define extends DefineType<any>>(name?: string, useOptions?: {
    handle?: typeof useDefineHandle<DefineItem<Define>>;
}): UseDefine<Define>;
export declare function useDefineHandle<T>(this: ModuleRoot, item: [string, T]): any;
