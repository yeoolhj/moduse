import { ModuleRoot } from "../core/index";
import { bindVueListener } from "./event";
import { createModuleHook } from "./hook";
export class VueModuleRoot extends ModuleRoot {
    ready() {
        bindVueListener.call(this);
    }
}
VueModuleRoot.hook = createModuleHook;
