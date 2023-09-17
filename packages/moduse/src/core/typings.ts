import { ModuleRoot } from "./extends";

export type ModuleOptions<T = "config" | "components" | "actions" | "modules"> =
  {
    [name in Filter<T, string>]?: any;
  };

export type ModuleType = ClassType<ModuleInstance>;

export type ModuleInstance = ModuleRoot<any>;

export interface AnyFun {
  (...args: any[]): any;
}

export interface ClassType<T> {
  new (...args: any): T;
}

export type Filter<T, C> = T extends C ? T : never;
