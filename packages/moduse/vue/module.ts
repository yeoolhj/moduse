import { ModuleOptions, ModuleRoot } from "../core/index";
import { bindVueListener } from "./event";
import { createModuleHook } from "./hook";

export class VueModuleRoot<
  Options extends ModuleOptions
> extends ModuleRoot<Options> {
  static hook = createModuleHook;

  ready() {
    bindVueListener.call(this);
  }
}
