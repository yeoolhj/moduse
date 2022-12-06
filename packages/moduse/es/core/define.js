export function createDefine(handle) {
    return function (define) {
        return (handle === null || handle === void 0 ? void 0 : handle(define)) || define;
    };
}
