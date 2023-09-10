import { ModuleRoot } from "./module";
export type ModuleOptions<T = "config" | "actions" | "components"> = {
    [name in Filter<T, string>]?: Record<string, any>;
};
export type ModuleType = ClassType<ModuleRoot<any>>;
export interface AnyFun {
    (...args: any[]): any;
}
export interface ClassType<T> {
    new (...args: any): T;
}
export type Filter<T, C> = T extends C ? T : never;
