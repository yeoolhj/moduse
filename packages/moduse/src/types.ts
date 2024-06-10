import { ModuleRoot } from "./ModuleRoot";

export type Filter<T, C> = T extends C ? T : never;

export interface AnyFun {
  (...args: any[]): any;
}

export type OptionsKeys =
  | "config"
  | "components"
  | "actions"
  | "modules"
  | "store";
export type ModuleOptions<T = OptionsKeys> = {
  [name in T & string]?: any;
};

export type ModuleInstance = ModuleRoot<any>;

export interface ClassType<T> {
  new (...args: any): T;
}

export type ModuleType = ClassType<ModuleInstance>;
