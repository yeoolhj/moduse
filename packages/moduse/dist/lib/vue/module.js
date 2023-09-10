"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VueModuleRoot = void 0;
const index_1 = require("../core/index");
const event_1 = require("./event");
const hook_1 = require("./hook");
class VueModuleRoot extends index_1.ModuleRoot {
    ready() {
        event_1.bindVueListener.call(this);
    }
}
exports.VueModuleRoot = VueModuleRoot;
VueModuleRoot.hook = hook_1.createModuleHook;
