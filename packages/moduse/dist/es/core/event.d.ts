import { ModuleRoot } from "./module";
import { AnyFun, Filter } from "./typings";
type IActionReturn<T, Actions extends Record<string, AnyFun>> = T extends `${infer P extends Filter<keyof Actions, string>}:success` ? Awaited<ReturnType<Actions[P]>> : never;
type ActionResults<T extends Record<string, any>> = {
    [name in `${Filter<keyof T, string>}:success`]: (args: IActionReturn<name, T>) => void;
} & {
    [name in `${Filter<keyof T, string>}:fail`]: (err: string) => void;
};
export declare function eventsListener<T extends ModuleRoot<any>, ActionHandles extends ActionResults<T["actions"]>, Key extends keyof ActionHandles>(this: T, name: Key, fn: ActionHandles[Key]): void;
export {};
