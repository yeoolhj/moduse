import { ModuleOptions, ModuleRoot } from "../core/index";
import { createModuleHook } from "./hook";
export declare class VueModuleRoot<Options extends ModuleOptions> extends ModuleRoot<Options> {
    static hook: typeof createModuleHook;
    ready(): void;
}
