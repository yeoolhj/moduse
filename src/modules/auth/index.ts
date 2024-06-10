import { AuthModule } from "./AuthModule";
import * as options from "./options";

export const { createAuthModule, useAuthModule } = AuthModule.defineHooks(
  "AuthModule",
  options
);
