import { defaults, defaultsDeep } from "lodash";
import { inject, onUnmounted, provide } from "vue";
import { AnyFun, ClassType } from "../core/index";
import { VueModuleRoot } from "./extends";

type PartialDeep<T> = T extends AnyFun
  ? T
  : T extends { setup?: any }
  ? T
  : T extends Record<any, any>
  ? {
      [name in keyof T]?: PartialDeep<T[name]>;
    }
  : T;

export function createHook<
  T extends ClassType<any>,
  N extends Capitalize<string>
>(this: T, name: N) {
  type IOptions = InstanceType<T> extends VueModuleRoot<infer P> ? P : never;
  type IOptionsPartial = {
    [name in keyof Omit<IOptions, "modules">]?: PartialDeep<
      InstanceType<T>[name]
    >;
  } & {
    modules?: {
      [name in keyof InstanceType<T>["modules"]]?: (
        this: InstanceType<T>
      ) => InstanceType<T>["modules"][name];
    };
  };
  const InstacneClass = this;
  const symbolStr = Symbol(name);
  function create(this: any, options: IOptionsPartial = {}) {
    const { components: userComponents, ...userOptions } = options;
    const { components: allComponents, ...allOptions } = this;
    options = defaultsDeep({}, userOptions, allOptions);
    options.components = defaults({}, userComponents, allComponents);
    const module: any = new InstacneClass(options);

    module.ready();
    onUnmounted(() => {
      module.destroy();
    });

    provide(symbolStr, module);
    return module as InstanceType<T>;
  }
  function useModule() {
    return inject(symbolStr) as InstanceType<T>;
  }
  return {
    create,
    [`use${name}`]: useModule,
  } as {
    create: typeof create;
  } & {
    [name in `use${N}`]: typeof useModule;
  };
}
