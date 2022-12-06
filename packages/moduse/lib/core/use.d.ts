import { ModuleRoot } from "./module";
export declare function useDefine(this: ModuleRoot, defines: unknown, options?: {
    createOptionsKey?: string;
    handle?: typeof useDefineHandle;
}): any;
export declare function useDefineHandle<T>(this: ModuleRoot, item: [string, T]): any;
