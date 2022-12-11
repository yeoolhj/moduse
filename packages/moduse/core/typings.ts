import { ModuleRoot, useDefineHandle } from "./module";

export interface CreateInstance<K> {
  <T extends typeof ModuleRoot, Instance extends InstanceType<T>>(
    this: T,
    options?: OptionsPick<Instance, K> & ThisType<Instance>
  ): Instance;
}
export interface DefineType<T> {
  [name: string]: T;
}

export interface UseDefine<Define> {
  <InstanceThis extends ModuleRoot, T extends Define>(
    this: InstanceThis,
    defines: (T & ThisType<InstanceThis>) | T[],
    options?: {
      createOptionsKey?: string;
      handle?: typeof useDefineHandle<Define>;
    }
  ): UnionToIntersectionType<T>;
}

export type OptionsPick<T extends ModuleRoot, K> = K extends keyof T
  ? { [name in K]?: Partial<T[name]> }
  : {
      [name in keyof Omit<T, "use">]?: Partial<T[name]>;
    };

export type DefineItem<T> = T extends DefineType<infer R> ? R : never;

export type UnionToIntersectionType<T> = (
  T extends any
    ? (x: {
        [name in keyof T]: T[name];
      }) => any
    : never
) extends (x: infer P) => any
  ? { [name in keyof P]: P[name] }
  : never;
