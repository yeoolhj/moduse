"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefineHandle = exports.createUse = exports.createInstance = exports.createDefine = exports.ModuleRoot = void 0;
const lodash_1 = require("lodash");
class ModuleRoot {
    constructor(options) {
        this.options = options;
        this.use = createUse();
    }
}
exports.ModuleRoot = ModuleRoot;
ModuleRoot.create = createInstance();
ModuleRoot.define = createDefine();
function createDefine(handle) {
    return function (define) {
        return (handle === null || handle === void 0 ? void 0 : handle(define)) || define;
    };
}
exports.createDefine = createDefine;
function createInstance() {
    return function (options) {
        // eslint-disable-next-line
        const ModuleClass = this;
        return new ModuleClass(options);
    };
}
exports.createInstance = createInstance;
function createUse(name, useOptions) {
    return function (defines, options) {
        var _a;
        const { createOptionsKey = name, handle = (useOptions === null || useOptions === void 0 ? void 0 : useOptions.handle) || useDefineHandle, } = options || {};
        const defs = (0, lodash_1.defaultsDeep)({}, createOptionsKey ? (_a = this.options) === null || _a === void 0 ? void 0 : _a[createOptionsKey] : undefined, ...(defines instanceof Array ? defines.reverse() : [defines]));
        Object.entries(defs).forEach((item) => {
            defs[item[0]] = handle.call(this, item);
        });
        return defs;
    };
}
exports.createUse = createUse;
function useDefineHandle(item) {
    const value = item[1];
    if (value instanceof Function)
        return value.bind(this);
    return value;
}
exports.useDefineHandle = useDefineHandle;
