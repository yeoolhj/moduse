"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindVueListener = void 0;
const vue_1 = require("vue");
function bindVueListener() {
    const { on } = this;
    const vueListener = (name, fn) => {
        on.call(this, name, fn);
        if ((0, vue_1.getCurrentInstance)()) {
            (0, vue_1.onBeforeUnmount)(() => {
                this.bus.unbind(name, fn);
            });
        }
    };
    this.on = vueListener;
}
exports.bindVueListener = bindVueListener;
