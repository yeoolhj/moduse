import { AnyFun, Filter, ModuleInstance } from "../types";

export function useActions(
  this: ModuleInstance,
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
        .catch((err: any) => {
          console.error(err);
          this.bus.emit(`${key}:fail`, err);
        });
      return funcResult;
    };
  });
  return actions;
}

type IActionReturn<
  T,
  Actions extends Record<string, AnyFun>
> = T extends `${infer P extends Filter<keyof Actions, string>}:success`
  ? Awaited<ReturnType<Actions[P]>>
  : never;

type ActionResults<T extends Record<string, any>> = {
  [name in `${Filter<keyof T, string>}:success`]: (
    args: IActionReturn<name, T>
  ) => void;
} & {
  [name in `${Filter<keyof T, string>}:fail`]: (err: string) => void;
};

export function addActionListener<
  T extends ModuleInstance,
  ActionHandles extends ActionResults<T["actions"]>,
  Key extends keyof ActionHandles
>(this: T, name: Key, fn: ActionHandles[Key]) {
  this.bus.on(name, fn);
}
