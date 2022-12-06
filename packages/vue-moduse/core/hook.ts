import { defaultsDeep } from "lodash";
import { ModuleRoot, ModuleCreate } from "moduse";
import { inject, provide } from "vue";

export function createHook<
  K extends typeof ModuleRoot,
  T extends InstanceType<K>,
  N extends Capitalize<string>
>(ModuleClass: K, moduleName: N) {
  type IOptionsKey = K["create"] extends ModuleCreate<infer P> ? P : never;
  type IOptions = IOptionsKey extends keyof T
    ? {
        [name in IOptionsKey]?: Partial<T[name]>;
      }
    : never;

  const moduleOptionsKey = `${moduleName}_Options`;
  let isSetted = false;

  // 配置模块信息
  function setModuleOptions(options: IOptions & ThisType<T>) {
    const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
    isSetted = true;
    provide(moduleOptionsKey, defaultsDeep(options, defineOptions));
  }

  // 初始化模块实例
  function initModule(options?: IOptions & ThisType<T>) {
    const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
    const currOptions = defaultsDeep(options, defineOptions);
    const module = new ModuleClass(currOptions);
    provide(moduleName, module);
    return module as T;
  }

  // 获取模块实例
  function useModule() {
    return inject(moduleName) as T;
  }

  type UseModule = `use${N}`;
  type InitModule = `init${N}`;
  type SetModuleOptions = `set${N}Options`;

  return {
    [`use${moduleName}`]: useModule,
    [`init${moduleName}`]: initModule,
    [`set${moduleName}Options`]: setModuleOptions,
  } as {
    [name in UseModule]: typeof useModule;
  } & {
    [name in InitModule]: typeof initModule;
  } & {
    [name in SetModuleOptions]: typeof setModuleOptions;
  };
}
