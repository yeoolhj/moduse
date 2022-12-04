import { ModuleRoot } from "./module";

export interface ModuleCreate<K> {
  <T extends typeof ModuleRoot, Instance extends InstanceType<T>>(
    this: T,
    options?: OptionsPick<Instance, K> & ThisType<Instance>
  ): Instance;
}

export type OptionsPick<T extends ModuleRoot, K> = K extends keyof T
  ? { [name in K]?: Partial<T[name]> }
  : {
      [name in keyof Omit<T, "use" | "createUse">]?: Partial<T[name]>;
    };

export interface DefineType<T> {
  [name: string]: T;
}

export type DefineItem<T> = T extends DefineType<infer R> ? R : never;

export type UnionToIntersectionType<T> = (
  T extends any
    ? (x: {
        [name in keyof T]: T[name];
      }) => any
    : never
) extends (x: infer P) => any
  ? P
  : never;
