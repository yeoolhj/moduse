"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createModuleHook = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
function createModuleHook(name) {
    const InstacneClass = this;
    const symbolStr = Symbol(name);
    function create(options = {}) {
        options = (0, lodash_1.defaultsDeep)({}, options, this);
        const module = new InstacneClass(options);
        module.ready();
        (0, vue_1.onUnmounted)(() => {
            module.destroy();
        });
        (0, vue_1.provide)(symbolStr, module);
        return module;
    }
    function useModule() {
        return (0, vue_1.inject)(symbolStr);
    }
    return {
        create,
        [`use${name}`]: useModule,
    };
}
exports.createModuleHook = createModuleHook;
