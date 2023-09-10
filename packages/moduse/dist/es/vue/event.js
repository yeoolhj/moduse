import { getCurrentInstance, onBeforeUnmount } from "vue";
export function bindVueListener() {
    const { on } = this;
    const vueListener = (name, fn) => {
        on.call(this, name, fn);
        if (getCurrentInstance()) {
            onBeforeUnmount(() => {
                this.bus.unbind(name, fn);
            });
        }
    };
    this.on = vueListener;
}
