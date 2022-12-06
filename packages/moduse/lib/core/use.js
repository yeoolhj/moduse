"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDefineHandle = exports.useDefine = void 0;
const lodash_1 = require("lodash");
function useDefine(defines, options) {
    var _a;
    const { createOptionsKey, handle = useDefineHandle } = options || {};
    const defs = (0, lodash_1.defaultsDeep)({}, createOptionsKey ? (_a = this.options) === null || _a === void 0 ? void 0 : _a[createOptionsKey] : undefined, ...(defines instanceof Array ? defines.reverse() : [defines]));
    Object.entries(defs).forEach((item) => {
        defs[item[0]] = handle.call(this, item);
    });
    return defs;
}
exports.useDefine = useDefine;
function useDefineHandle(item) {
    const value = item[1];
    if (value instanceof Function)
        return value.bind(this);
    return value;
}
exports.useDefineHandle = useDefineHandle;
