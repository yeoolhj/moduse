"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = exports.EventHandle = void 0;
class EventHandle {
    constructor(owner, name, fn) {
        this.owner = owner;
        this.name = name;
        this.fn = fn;
    }
    unbind() {
        if (!this.owner)
            return;
        this.owner.unbind(this.name, this.fn);
        this.owner = null;
        this.name = null;
        this.fn = null;
    }
    call() {
        if (!this.fn)
            return;
        this.fn.call(this.owner, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
    }
    on(name, fn) {
        return this.owner.on(name, fn);
    }
}
exports.EventHandle = EventHandle;
class Bus {
    constructor() {
        this._events = {};
        this._suspendEvents = false;
    }
    get suspendEvents() {
        return this._suspendEvents;
    }
    set suspendEvents(value) {
        this._suspendEvents = !!value;
    }
    nextTick(name, fn) {
        this.on(name, (function () {
            let timer = null;
            return function (...args) {
                if (timer)
                    clearTimeout(timer);
                timer = setTimeout(fn.bind(null, ...args));
            };
        })());
    }
    on(name, fn) {
        const events = this._events[name];
        if (events === undefined) {
            this._events[name] = [fn];
        }
        else {
            if (events.indexOf(fn) == -1)
                events.push(fn);
        }
        return new EventHandle(this, name, fn);
    }
    once(name, fn) {
        const self = this;
        const evt = this.on(name, function (...args) {
            fn.call(self, ...args);
            evt.unbind();
        });
        return evt;
    }
    emit(name, ...args) {
        if (this._suspendEvents)
            return;
        let events = this._events[name];
        if (!events)
            return;
        events = events.slice(0);
        for (let i = 0; i < events.length; i++) {
            if (!events[i])
                continue;
            try {
                events[i].call(this, ...args);
            }
            catch (ex) {
                console.error(ex);
            }
        }
    }
    unbind(name, fn) {
        if (name) {
            const events = this._events[name];
            if (!events)
                return this;
            if (fn) {
                const i = events.indexOf(fn);
                if (i !== -1) {
                    if (events.length === 1) {
                        delete this._events[name];
                    }
                    else {
                        events.splice(i, 1);
                    }
                }
            }
            else {
                delete this._events[name];
            }
        }
        else {
            this._events = {};
        }
        return this;
    }
}
exports.Bus = Bus;
