import { defaultsDeep } from "lodash";
export function useDefine(defines, options) {
    var _a;
    const { createOptionsKey, handle = useDefineHandle } = options || {};
    const defs = defaultsDeep({}, createOptionsKey ? (_a = this.options) === null || _a === void 0 ? void 0 : _a[createOptionsKey] : undefined, ...(defines instanceof Array ? defines.reverse() : [defines]));
    Object.entries(defs).forEach((item) => {
        defs[item[0]] = handle.call(this, item);
    });
    return defs;
}
export function useDefineHandle(item) {
    const value = item[1];
    if (value instanceof Function)
        return value.bind(this);
    return value;
}
