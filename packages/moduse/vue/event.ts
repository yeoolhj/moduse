import { getCurrentInstance, onBeforeUnmount } from "vue";
import { ModuleRoot } from "../core/module";

export function bindVueListener(this: ModuleRoot<any>) {
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
