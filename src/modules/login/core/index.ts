import { LoginModule } from "../extends";

export * from "./actions";
export const { create, useLoginModule } = LoginModule.hook("LoginModule");
