import { createDefine } from "./define";
import {
  DefineItem,
  DefineType,
  OptionsPick,
  UnionToIntersectionType,
} from "./typings";
import { useDefine, useDefineHandle } from "./use";

export class ModuleRoot {
  static create = createInstance();
  static define = createDefine();

  constructor(protected options?: { [name: string]: any }) {}

  protected use<T extends DefineType<unknown>>(
    this: ModuleRoot,
    defineName: string,
    defines: T | T[],
    handle?: typeof useDefineHandle
  ): UnionToIntersectionType<T> {
    return useDefine.call(this, defineName, defines, handle);
  }

  protected createUse<This extends ModuleRoot, K extends keyof This>(
    this: This,
    defineName: K,
    handle?: (item: [string, DefineItem<This[K]>]) => any
  ) {
    return <T extends DefineType<unknown>>(defines: T | T[]) => {
      return this.use(defineName, defines, handle as any);
    };
  }
}

export function createInstance<K>() {
  return function <
    T extends typeof ModuleRoot,
    Instance extends InstanceType<T>
  >(this: T, options?: OptionsPick<Instance, K> & ThisType<Instance>) {
    // eslint-disable-next-line
    const ModuleClass = this;
    return new ModuleClass(options) as Instance;
  };
}
