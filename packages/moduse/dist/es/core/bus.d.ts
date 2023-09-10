export declare class EventHandle {
    owner: any;
    name: string | null;
    fn: Function | null;
    constructor(owner: any, name: string, fn: Function);
    unbind(): void;
    call(): void;
    on(name: string, fn: Function): any;
}
export declare class Bus {
    _events: {
        [name: string]: any;
    };
    _suspendEvents: boolean;
    constructor();
    get suspendEvents(): boolean;
    set suspendEvents(value: boolean);
    nextTick(name: string, fn: Function): void;
    on(name: any, fn: Function): EventHandle;
    once(name: any, fn: Function): EventHandle;
    emit(name: any, ...args: any[]): void;
    unbind(name?: string, fn?: Function): this;
}
