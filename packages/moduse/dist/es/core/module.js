import { Bus } from "./bus";
import { eventsListener } from "./event";
import { createField, createFuncField, useActionFields } from "./fields";
import { createPlugin, getPlugin, usePlugin } from "./plugin";
export class ModuleRoot {
    constructor(options) {
        this.bus = new Bus();
        this.on = eventsListener;
        this.plugins = new Map();
        this.use = usePlugin;
        this.getPlugin = getPlugin;
        this.config = options.config;
        this.components = options.components;
        this.actions = useActionFields.call(this, options.actions);
    }
    ready() { }
    destroy() { }
}
ModuleRoot.config = createField;
ModuleRoot.action = createFuncField;
ModuleRoot.plugin = createPlugin;
