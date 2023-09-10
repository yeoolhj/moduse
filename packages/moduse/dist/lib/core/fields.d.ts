import { ModuleRoot } from "./module";
import { AnyFun, ClassType } from "./typings";
export declare function createField<T>(fields: T): T;
export declare function createFuncField<T extends ClassType<any>, O>(this: T, fields: O & ThisType<InstanceType<T>>): O & ThisType<InstanceType<T>>;
export declare function useFuncFields(this: ModuleRoot<any>, fieldOpts?: Record<string, AnyFun>): any;
export declare function useActionFields(this: ModuleRoot<any>, actionOpts?: Record<string, AnyFun>): any;
