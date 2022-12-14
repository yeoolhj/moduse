import { createDefine } from "./define";
import {
  DefineItem,
  DefineType,
  ModuleCreate,
  UnionToIntersectionType
} from "./typings";
import { useDefine, useDefineHandle } from "./use";

export class ModuleRoot {
  static create = createInstance<keyof ModuleRoot>();
  static define = createDefine();

  constructor(protected options?: { [name: string]: any }) {}

  protected use<T extends DefineType<unknown>>(
    this: ModuleRoot,
    defines: (T & ThisType<this>) | T[],
    options?: {
      createOptionsKey?: string;
      handle?: typeof useDefineHandle;
    }
  ): UnionToIntersectionType<T> {
    return useDefine.call(this, defines, options);
  }

  protected createUse<This extends ModuleRoot, K extends keyof This>(
    this: This,
    createOptionsKey: K,
    options: {
      handle?: (item: [string, DefineItem<This[K]>]) => any;
    } = {}
  ) {
    return <T extends DefineType<unknown>>(defines: T | T[]) => {
      return this.use(defines, { createOptionsKey, ...(options as any) });
    };
  }
}

export function createInstance<K>() {
  return function (options) {
    // eslint-disable-next-line
    const ModuleClass = this;
    return new ModuleClass(options);
  } as ModuleCreate<K>;
}
