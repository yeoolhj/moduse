import { AnyFun, ClassType, ModuleInstance } from "../typings";

export function createFields<T>(fields: T) {
  return fields;
}
export function createFuncFields<T extends ClassType<any>, O>(
  this: T,
  fields: O & ThisType<InstanceType<T>>
) {
  return fields;
}

export function useFuncFields(
  this: ModuleInstance,
  fieldOpts: Record<string, AnyFun> = {}
) {
  const fields: any = {};
  Object.entries(fieldOpts).forEach(([key, func]) => {
    fields[key] = func.bind(this);
  });
  return fields;
}
