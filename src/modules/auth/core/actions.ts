import { AuthModule } from "./extends";

export const actions = AuthModule.action({
  async init() {
    const res = await this.actions.initUserInfo();
    if (res.data) {
      // todo 已登录逻辑
    } else {
      // todo 未登录逻辑
    }
  },
  async initUserInfo() {
    return this.request("/getUserInfo");
  },
  async login(data: { name: string; password: string }) {
    return this.request("/login", { method: "POST", data });
  },
});
