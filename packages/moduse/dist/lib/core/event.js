"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsListener = void 0;
function eventsListener(name, fn) {
    this.bus.on(name, fn);
}
exports.eventsListener = eventsListener;
