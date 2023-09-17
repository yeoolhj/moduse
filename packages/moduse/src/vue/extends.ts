import { ModuleOptions, ModuleRoot } from "../core/index";
import { bindVueListener } from "./event";
import { createHook } from "./hook";

export class VueModuleRoot<
  Options extends ModuleOptions
> extends ModuleRoot<Options> {
  static hook = createHook;

  ready() {
    bindVueListener.call(this);
  }
}
