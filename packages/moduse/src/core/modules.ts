import { ClassType, ModuleInstance } from "../types";

type CreateModules = Record<string, () => ModuleInstance>;

export function defineModules<
  T extends ClassType<any>,
  M extends CreateModules
>(this: T, modules: M & ThisType<InstanceType<T>>) {
  return modules;
}

export function useModules(this: ModuleInstance, modules: CreateModules = {}) {
  const submodules: any = {};
  this.modules = {};
  Object.entries(modules).forEach(([key, value]) => {
    this.modules[key] = submodules[key] = value.call(this);
  });
  return submodules;
}
