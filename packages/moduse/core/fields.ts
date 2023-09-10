import { ModuleRoot } from "./module";
import { AnyFun, ClassType } from "./typings";

export function createField<T>(fields: T) {
  return fields;
}
export function createFuncField<T extends ClassType<any>, O>(
  this: T,
  fields: O & ThisType<InstanceType<T>>
) {
  return fields;
}

export function useFuncFields(
  this: ModuleRoot<any>,
  fieldOpts: Record<string, AnyFun> = {}
) {
  const fields: any = {};
  Object.entries(fieldOpts).forEach(([key, func]) => {
    fields[key] = func.bind(this);
  });
  return fields;
}

export function useActionFields(
  this: ModuleRoot<any>,
  actionOpts: Record<string, AnyFun> = {}
) {
  const actions: any = {};
  Object.entries(actionOpts).forEach(([key, func]) => {
    actions[key] = (...args: any[]) => {
      let funcResult;
      try {
        funcResult = (func as any).call(this, ...args) || Promise.resolve();
        if (!(funcResult instanceof Promise)) {
          funcResult = Promise.resolve(funcResult);
        }
      } catch (error) {
        funcResult = Promise.reject(error);
      }
      funcResult
        .then((res: any) => this.bus.emit(`${key}:success`, res))
        .catch((err: any) => this.bus.emit(`${key}:fail`, err));
      return funcResult;
    };
  });

  return actions;
}
