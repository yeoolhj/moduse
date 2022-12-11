import { defaultsDeep } from "lodash";
import { inject, provide } from "vue";
export function createHook(ModuleClass, moduleName) {
    const moduleOptionsKey = `${moduleName}_Options`;
    let isSetted = false;
    // 设置模块默认options
    function defaultModule(options) {
        const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
        isSetted = true;
        provide(moduleOptionsKey, defaultsDeep(options, defineOptions));
    }
    // 初始化模块实例
    function initModule(options) {
        const defineOptions = (isSetted && inject(moduleOptionsKey)) || {};
        const currOptions = defaultsDeep(options, defineOptions);
        const module = new ModuleClass(currOptions);
        provide(moduleName, module);
        return module;
    }
    // 获取模块实例
    function useModule() {
        return inject(moduleName);
    }
    return {
        [`use${moduleName}`]: useModule,
        [`init${moduleName}`]: initModule,
        [`default${moduleName}`]: defaultModule,
    };
}
