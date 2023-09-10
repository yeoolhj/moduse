"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useActionFields = exports.useFuncFields = exports.createFuncField = exports.createField = void 0;
function createField(fields) {
    return fields;
}
exports.createField = createField;
function createFuncField(fields) {
    return fields;
}
exports.createFuncField = createFuncField;
function useFuncFields(fieldOpts = {}) {
    const fields = {};
    Object.entries(fieldOpts).forEach(([key, func]) => {
        fields[key] = func.bind(this);
    });
    return fields;
}
exports.useFuncFields = useFuncFields;
function useActionFields(actionOpts = {}) {
    const actions = {};
    Object.entries(actionOpts).forEach(([key, func]) => {
        actions[key] = (...args) => {
            let funcResult;
            try {
                funcResult = func.call(this, ...args) || Promise.resolve();
                if (!(funcResult instanceof Promise)) {
                    funcResult = Promise.resolve(funcResult);
                }
            }
            catch (error) {
                funcResult = Promise.reject(error);
            }
            funcResult
                .then((res) => this.bus.emit(`${key}:success`, res))
                .catch((err) => this.bus.emit(`${key}:fail`, err));
            return funcResult;
        };
    });
    return actions;
}
exports.useActionFields = useActionFields;
