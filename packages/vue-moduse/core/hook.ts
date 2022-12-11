import { defaultsDeep } from "lodash";
import { ModuleRoot, CreateInstance } from "moduse";
import { inject, provide } from "vue";

export function createHook<
  K extends typeof ModuleRoot,
  T extends InstanceType<K>,
  N extends Capitalize<string>
>(ModuleClass: K, moduleName: N) {
  type IOptionsKey = K["create"] extends CreateInstance<infer P> ? P : never;
  type IOptions = IOptionsKey extends keyof T
    ? {
        [name in IOptionsKey]?: Partial<T[name]>;
      }
    : never;

  const moduleOptionsKey = `${moduleName}_Options`;
  let isSetted = false;

  // 设置模块默认options
  function defaultModule(options: IOptions & ThisType<T>) {
    const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
    isSetted = true;
    provide(moduleOptionsKey, defaultsDeep(options, defineOptions));
  }

  // 初始化模块实例
  function initModule(options?: IOptions & ThisType<T>) {
    const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
    const currOptions = defaultsDeep(options, defineOptions);
    const module = new (ModuleClass as any)(currOptions);
    provide(moduleName, module);
    return module as T;
  }

  // 获取模块实例
  function useModule() {
    return inject(moduleName) as T;
  }

  type UseModule = `use${N}`;
  type InitModule = `init${N}`;
  type DefaultModule = `default${N}`;

  return {
    [`use${moduleName}`]: useModule,
    [`init${moduleName}`]: initModule,
    [`default${moduleName}`]: defaultModule,
  } as {
    [name in UseModule]: typeof useModule;
  } & {
    [name in InitModule]: typeof initModule;
  } & {
    [name in DefaultModule]: typeof defaultModule;
  };
}
