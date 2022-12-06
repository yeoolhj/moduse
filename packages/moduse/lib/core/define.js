"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefine = void 0;
function createDefine(handle) {
    return function (define) {
        return (handle === null || handle === void 0 ? void 0 : handle(define)) || define;
    };
}
exports.createDefine = createDefine;
