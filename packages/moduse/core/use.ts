import { defaultsDeep } from "lodash";
import { ModuleRoot } from "./module";

export function useDefine(
  this: ModuleRoot,
  defineName: string,
  defines: unknown,
  handle = useDefineHandle
) {
  const defs: any = defaultsDeep(
    {},
    this.options?.[defineName],
    ...(defines instanceof Array ? defines.reverse() : [defines])
  );

  Object.entries(defs).forEach((item) => {
    defs[item[0]] = handle.call(this, item);
  });

  return defs;
}

export function useDefineHandle<T>(this: ModuleRoot, item: [string, T]) {
  const value = item[1];
  if (value instanceof Function) return value.bind(this);
  return value;
}
