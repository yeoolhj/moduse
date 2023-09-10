export function createField(fields) {
    return fields;
}
export function createFuncField(fields) {
    return fields;
}
export function useFuncFields(fieldOpts = {}) {
    const fields = {};
    Object.entries(fieldOpts).forEach(([key, func]) => {
        fields[key] = func.bind(this);
    });
    return fields;
}
export function useActionFields(actionOpts = {}) {
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
