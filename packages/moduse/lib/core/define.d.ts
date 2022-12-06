import { ModuleRoot } from "./module";
import { DefineType } from "./typings";
export declare function createDefine<T = DefineType<unknown>>(handle?: (define: T) => T): <K extends typeof ModuleRoot, Define extends T>(this: K, define: Define & ThisType<InstanceType<K>>) => Define;
