import { createLoginModule } from "@/modules/login";
import { AuthModule } from "../AuthModule";

export const modules = AuthModule.defineModules({
  login() {
    return createLoginModule();
  },
});
