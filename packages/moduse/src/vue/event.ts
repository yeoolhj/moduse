import { ModuleInstance } from "src/core/typings";
import { getCurrentInstance, onBeforeUnmount } from "vue";

export function bindVueListener(this: ModuleInstance) {
  const { on } = this;
  const vueListener: typeof on = (name, fn) => {
    on.call(this, name as any, fn);
    if (getCurrentInstance()) {
      onBeforeUnmount(() => {
        this.bus.unbind(name as string, fn);
      });
    }
  };
  this.on = vueListener;
}
