import { AuthModule } from "../AuthModule";

export const utils = AuthModule.defineUtils({
  getToken() {
    return localStorage.getItem("token");
  },
});
