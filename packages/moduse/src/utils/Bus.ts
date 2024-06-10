export class EventHandle {
  owner: any;
  name: string | null;
  fn: Function | null;

  constructor(owner: any, name: string, fn: Function) {
    this.owner = owner;
    this.name = name;
    this.fn = fn;
  }

  unbind() {
    if (!this.owner) return;
    this.owner.unbind(this.name, this.fn);

    this.owner = null;
    this.name = null;
    this.fn = null;
  }

  call() {
    if (!this.fn) return;

    this.fn.call(
      this.owner,
      arguments[0],
      arguments[1],
      arguments[2],
      arguments[3],
      arguments[4],
      arguments[5],
      arguments[6],
      arguments[7]
    );
  }

  on(name: string, fn: Function) {
    return this.owner.on(name, fn);
  }
}

export class Bus {
  _events: { [name: string]: any };
  _suspendEvents: boolean;

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

  nextTick(name: string, fn: Function) {
    this.on(
      name,
      (function () {
        let timer: any = null;
        return function (...args: any[]) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(fn.bind(null, ...args));
        };
      })()
    );
  }

  on(name: any, fn: Function): EventHandle {
    const events = this._events[name];
    if (events === undefined) {
      this._events[name] = [fn];
    } else {
      if (events.indexOf(fn) === -1) events.push(fn);
    }
    return new EventHandle(this, name, fn);
  }

  once(name: any, fn: Function) {
    const self = this;
    const evt = this.on(name, function (...args: any[]) {
      fn.call(self, ...args);
      evt.unbind();
    });
    return evt;
  }

  emit(name: any, ...args: any[]): void {
    if (this._suspendEvents) return;

    let events = this._events[name];
    if (!events) return;

    events = events.slice(0);

    for (let i = 0; i < events.length; i++) {
      if (!events[i]) continue;

      try {
        events[i].call(this, ...args);
      } catch (ex) {
        console.error(ex);
      }
    }
  }

  unbind(name?: string, fn?: Function) {
    if (name) {
      const events = this._events[name];
      if (!events) return this;

      if (fn) {
        const i = events.indexOf(fn);
        if (i !== -1) {
          if (events.length === 1) {
            delete this._events[name];
          } else {
            events.splice(i, 1);
          }
        }
      } else {
        delete this._events[name];
      }
    } else {
      this._events = {};
    }
    return this;
  }
}
