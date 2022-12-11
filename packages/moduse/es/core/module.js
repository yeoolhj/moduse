import { defaultsDeep } from "lodash";
export class ModuleRoot {
    constructor(options) {
        this.options = options;
        this.use = createUse();
    }
}
ModuleRoot.create = createInstance();
ModuleRoot.define = createDefine();
export function createDefine(handle) {
    return function (define) {
        return (handle === null || handle === void 0 ? void 0 : handle(define)) || define;
    };
}
export function createInstance() {
    return function (options) {
        // eslint-disable-next-line
        const ModuleClass = this;
        return new ModuleClass(options);
    };
}
export function createUse(name, useOptions) {
    return function (defines, options) {
        var _a;
        const { createOptionsKey = name, handle = (useOptions === null || useOptions === void 0 ? void 0 : useOptions.handle) || useDefineHandle, } = options || {};
        const defs = defaultsDeep({}, createOptionsKey ? (_a = this.options) === null || _a === void 0 ? void 0 : _a[createOptionsKey] : undefined, ...(defines instanceof Array ? defines.reverse() : [defines]));
        Object.entries(defs).forEach((item) => {
            defs[item[0]] = handle.call(this, item);
        });
        return defs;
    };
}
export function useDefineHandle(item) {
    const value = item[1];
    if (value instanceof Function)
        return value.bind(this);
    return value;
}
