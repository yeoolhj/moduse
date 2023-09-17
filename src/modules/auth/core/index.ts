import { AuthModule } from "./extends";

export * from "./actions";
export * from "./modules";

export const { create, useAuthModule } = AuthModule.hook("AuthModule");
