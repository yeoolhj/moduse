"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInstance = exports.ModuleRoot = void 0;
const define_1 = require("./define");
const use_1 = require("./use");
class ModuleRoot {
    constructor(options) {
        this.options = options;
    }
    use(defines, options) {
        return use_1.useDefine.call(this, defines, options);
    }
    createUse(createOptionsKey, options = {}) {
        return (defines) => {
            return this.use(defines, Object.assign({ createOptionsKey }, options));
        };
    }
}
exports.ModuleRoot = ModuleRoot;
ModuleRoot.create = createInstance();
ModuleRoot.define = (0, define_1.createDefine)();
function createInstance() {
    return function (options) {
        // eslint-disable-next-line
        const ModuleClass = this;
        return new ModuleClass(options);
    };
}
exports.createInstance = createInstance;
