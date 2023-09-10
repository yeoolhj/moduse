import { ClassType } from "../core/index";
import { VueModuleRoot } from "./module";
type PartialDeep<T> = T extends (...args: any[]) => any ? T : T extends Record<string, any> ? T extends VueModuleRoot<any> ? T : {
    [name in keyof T]?: PartialDeep<T[name]>;
} : T;
export declare function createModuleHook<T extends ClassType<any>, N extends Capitalize<string>>(this: T, name: N): {
    create: (this: any, options?: { [name in keyof (InstanceType<T> extends VueModuleRoot<infer P extends import("../core/typings").ModuleOptions> ? P : never)]?: PartialDeep<InstanceType<T>[name]> | undefined; } & ThisType<InstanceType<T>>) => InstanceType<T>;
} & { [name_1 in `use${N}`]: () => InstanceType<T>; };
export {};
