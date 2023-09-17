import { AuthModule } from "./extends";
import * as LoginModule from "../../login";

export const modules = AuthModule.module({
  login() {
    return LoginModule.create();
  },
});
