import { Bus } from "./bus";
import { eventsListener } from "./event";
import { createField, createFuncField } from "./fields";
import { createPlugin, getPlugin, usePlugin } from "./plugin";
import { ModuleOptions } from "./typings";
export declare class ModuleRoot<Options extends ModuleOptions> {
    static config: typeof createField;
    static action: typeof createFuncField;
    static plugin: typeof createPlugin;
    config: Options["config"];
    components: Options["components"];
    actions: Options["actions"];
    constructor(options: Options);
    protected bus: Bus;
    on: typeof eventsListener;
    protected plugins: Map<any, any>;
    use: typeof usePlugin;
    getPlugin: typeof getPlugin;
    ready(): void;
    destroy(): void;
}
