"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleRoot = void 0;
const bus_1 = require("./bus");
const event_1 = require("./event");
const fields_1 = require("./fields");
const plugin_1 = require("./plugin");
class ModuleRoot {
    constructor(options) {
        this.bus = new bus_1.Bus();
        this.on = event_1.eventsListener;
        this.plugins = new Map();
        this.use = plugin_1.usePlugin;
        this.getPlugin = plugin_1.getPlugin;
        this.config = options.config;
        this.components = options.components;
        this.actions = fields_1.useActionFields.call(this, options.actions);
    }
    ready() { }
    destroy() { }
}
exports.ModuleRoot = ModuleRoot;
ModuleRoot.config = fields_1.createField;
ModuleRoot.action = fields_1.createFuncField;
ModuleRoot.plugin = plugin_1.createPlugin;
