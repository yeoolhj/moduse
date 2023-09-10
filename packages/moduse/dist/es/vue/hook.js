import { defaultsDeep } from "lodash";
import { inject, onUnmounted, provide } from "vue";
export function createModuleHook(name) {
    const InstacneClass = this;
    const symbolStr = Symbol(name);
    function create(options = {}) {
        options = defaultsDeep({}, options, this);
        const module = new InstacneClass(options);
        module.ready();
        onUnmounted(() => {
            module.destroy();
        });
        provide(symbolStr, module);
        return module;
    }
    function useModule() {
        return inject(symbolStr);
    }
    return {
        create,
        [`use${name}`]: useModule,
    };
}
