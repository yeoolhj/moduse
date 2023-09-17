import { VueModuleRoot } from "moduse/vue";
import * as options from "..";
import axios from "axios";

export class AuthModule extends VueModuleRoot<typeof options> {
  ready() {
    this.actions.init();
  }
  request = axios.create();
}
