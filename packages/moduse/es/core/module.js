import { createDefine } from "./define";
import { useDefine } from "./use";
export class ModuleRoot {
    constructor(options) {
        this.options = options;
    }
    use(defines, options) {
        return useDefine.call(this, defines, options);
    }
    createUse(createOptionsKey, options = {}) {
        return (defines) => {
            return this.use(defines, Object.assign({ createOptionsKey }, options));
        };
    }
}
ModuleRoot.create = createInstance();
ModuleRoot.define = createDefine();
export function createInstance() {
    return function (options) {
        // eslint-disable-next-line
        const ModuleClass = this;
        return new ModuleClass(options);
    };
}
