import { ClassType, ModuleInstance } from "./typings";

type CreateModules = Record<string, () => ModuleInstance>;

export function createModules<
  T extends ClassType<any>,
  M extends CreateModules
>(this: T, modules: M & ThisType<InstanceType<T>>) {
  return modules;
}

export function useModules(this: ModuleInstance, modules: CreateModules = {}) {
  const submodules: any = {};
  Object.entries(modules).forEach(([key, value]) => {
    submodules[key] = value.call(this);
  });
  return submodules;
}
