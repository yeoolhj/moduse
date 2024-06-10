import * as options from "./options";
import axios from "axios";
import { MyModuleRoot } from "../MyModuleRoot";

export class AuthModule extends MyModuleRoot<typeof options> {
  ready() {
    this.actions.init();
  }
  request = axios.create();
}
