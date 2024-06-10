import { getCurrentInstance, onUnmounted, provide } from "vue";
import { AnyFun, ClassType, ModuleOptions } from "../types";
import { defaults, defaultsDeep } from "../utils/defaults";

type PartialDeep<T> = T extends AnyFun
  ? T
  : T extends { setup?: any }
  ? T
  : T extends Record<any, any>
  ? {
      [name in keyof T]?: PartialDeep<T[name]>;
    }
  : T;

export function defineHooks<
  T extends ClassType<any>,
  N extends Capitalize<string>,
  O extends ModuleOptions
>(this: T, name: N, defaultOptions: O) {
  type IOptionsPartial = {
    [name in keyof Omit<O, "modules">]?: PartialDeep<InstanceType<T>[name]>;
  } & {
    modules?: {
      [name in keyof InstanceType<T>["modules"]]?: (
        this: InstanceType<T>
      ) => InstanceType<T>["modules"][name];
    };
  };
  const ModuleClass: any = this;
  const symbolName = Symbol(name);

  function createModule(instanceOptions: IOptionsPartial = {}) {
    const { components: customComponents, ...customOptions } = instanceOptions;
    const { components: defComponents, ...defOptions } = defaultOptions;
    const currentOptions = defaultsDeep({}, customOptions, defOptions);
    currentOptions.components = defaults({}, customComponents, defComponents);
    const module: any = new ModuleClass(currentOptions);

    provide(symbolName, module);
    onUnmounted(() => {
      module.destroy();
    });
    /**
     * 在微任务中注册模块ready()方法
     * 不能在setup中同步执行ready, 其可能会导致一些setup异常状态
     * 如：在setup中调用router.push(),会导致当前setup上下文丢失
     */
    Promise.resolve().then(() => module.ready());

    return module as InstanceType<T>;
  }

  function useModule() {
    return (getCurrentInstance() as any).provides[
      symbolName
    ] as InstanceType<T>;
  }

  return {
    [`create${name}`]: createModule,
    [`use${name}`]: useModule,
  } as {
    [name in `create${N}`]: typeof createModule;
  } & {
    [name in `use${N}`]: typeof useModule;
  };
}
