"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHook = void 0;
const lodash_1 = require("lodash");
const vue_1 = require("vue");
function createHook(ModuleClass, moduleName) {
    const moduleOptionsKey = `${moduleName}_Options`;
    let isSetted = false;
    // 配置模块信息
    function setModuleOptions(options) {
        const defineOptions = (isSetted && (0, vue_1.inject)(moduleOptionsKey)) || {};
        isSetted = true;
        (0, vue_1.provide)(moduleOptionsKey, (0, lodash_1.defaultsDeep)(options, defineOptions));
    }
    // 初始化模块实例
    function initModule(options) {
        const defineOptions = (isSetted && (0, vue_1.inject)(moduleOptionsKey)) || {};
        const currOptions = (0, lodash_1.defaultsDeep)(options, defineOptions);
        const module = new ModuleClass(currOptions);
        (0, vue_1.provide)(moduleName, module);
        return module;
    }
    // 获取模块实例
    function useModule() {
        return (0, vue_1.inject)(moduleName);
    }
    return {
        [`use${moduleName}`]: useModule,
        [`init${moduleName}`]: initModule,
        [`set${moduleName}Options`]: setModuleOptions,
    };
}
exports.createHook = createHook;
