export function eventsListener(name, fn) {
    this.bus.on(name, fn);
}
