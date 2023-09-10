import { LoginModule } from "../extends";

export const actions = LoginModule.action({
  pwdLogin(data: { username: string; password: string }) {
    if (!data.username) {
      return Promise.reject("请输入姓名");
    } else if (!data.password) {
      return Promise.reject("请输入密码");
    }
    console.log("登录成功");
  },
});
