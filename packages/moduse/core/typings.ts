import { ModuleRoot } from "./module";

export type OptionsPick<T extends ModuleRoot, K> = K extends keyof T
  ? { [name in K]?: Partial<T[name]> }
  : {
      [name in keyof Omit<T, "use" | "createUse">]?: Partial<T[name]>;
    };

export type DefineType<T> = { [name: string]: T };

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
