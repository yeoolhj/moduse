import { ModuleRoot } from "./module";
import { ModuleType } from "./typings";
interface PluginCreator<T extends ModuleType, P = unknown> {
    install: (this: InstanceType<T>) => P;
}
export declare function createPlugin<T extends ModuleType, P>(this: T, creator: PluginCreator<T, P>): PluginCreator<T, P>;
export declare function usePlugin(this: ModuleRoot<any>, pluginCreator: PluginCreator<any>): void;
export declare function getPlugin<P extends PluginCreator<any>>(this: ModuleRoot<any>, creator: P): ReturnType<P["install"]> | undefined;
export {};
