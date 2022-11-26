import { ModuleRoot } from "./module";
import { DefineType } from "./typings";

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
