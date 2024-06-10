import { LoginModule } from "./LoginModule";
import * as options from "./options";

export const { createLoginModule, useLoginModule } = LoginModule.defineHooks(
  "LoginModule",
  options
);
