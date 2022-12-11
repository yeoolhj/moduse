import { defaultsDeep } from "lodash";
import { CreateInstance, DefineItem, DefineType, UseDefine } from "./typings";

export abstract class ModuleRoot {
  static create = createInstance<unknown>();
  static define = createDefine();

  constructor(public options?: { [name: string]: any }) {}

  protected use = createUse();
}

export function createDefine<T = DefineType<unknown>>(
  handle?: (define: T) => T
) {
  return function <K extends typeof ModuleRoot, Define extends T>(
    this: K,
    define: Define & ThisType<InstanceType<K>>
  ): Define {
    return (handle?.(define) as Define) || define;
  };
}

export function createInstance<K>() {
  return function (options) {
    // eslint-disable-next-line
    const ModuleClass: any = this;
    return new ModuleClass(options);
  } as CreateInstance<K>;
}

export function createUse<Define extends DefineType<any>>(
  name?: string,
  useOptions?: {
    handle?: typeof useDefineHandle<DefineItem<Define>>;
  }
) {
  return function (defines, options) {
    const {
      createOptionsKey = name,
      handle = useOptions?.handle || useDefineHandle,
    } = options || {};
    const defs: any = defaultsDeep(
      {},
      createOptionsKey ? this.options?.[createOptionsKey] : undefined,
      ...(defines instanceof Array ? defines.reverse() : [defines])
    );

    Object.entries(defs).forEach((item) => {
      defs[item[0]] = handle.call(this, item as any);
    });

    return defs;
  } as UseDefine<Define>;
}

export function useDefineHandle<T>(this: ModuleRoot, item: [string, T]) {
  const value = item[1];
  if (value instanceof Function) return value.bind(this);
  return value;
}
