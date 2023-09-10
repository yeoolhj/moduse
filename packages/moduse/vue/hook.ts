import { defaultsDeep } from "lodash";
import { inject, onUnmounted, provide } from "vue";
import { ClassType } from "../core/index";
import { VueModuleRoot } from "./module";

type PartialDeep<T> = T extends (...args: any[]) => any
  ? T
  : T extends Record<string, any>
  ? T extends VueModuleRoot<any>
    ? T
    : {
        [name in keyof T]?: PartialDeep<T[name]>;
      }
  : T;

export function createModuleHook<
  T extends ClassType<any>,
  N extends Capitalize<string>
>(this: T, name: N) {
  type IOptionsKey = InstanceType<T> extends VueModuleRoot<infer P> ? P : never;
  type IOptions = {
    [name in keyof IOptionsKey]?: PartialDeep<InstanceType<T>[name]>;
  };
  const InstacneClass = this;
  const symbolStr = Symbol(name);
  function create(
    this: any,
    options: IOptions & ThisType<InstanceType<T>> = {}
  ) {
    options = defaultsDeep({}, options, this);
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
