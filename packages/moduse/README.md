# moduse

moduse 是一套模块化开发框架

- 模块提供了配置（config）、重载(overwrite)、继承(extends)、插件(plugin)等扩展属性
- 基于 typescript 开发，在保证代码简洁的同时提供最全面的类型检查

## 安装

```
npm install moduse
```

## 模块示例

#### step1:定义模块类和模块导出

/core/extends.ts

```ts
import { VueModuleRoot } from "moduse/vue";
import * as options from "..";
import axios from "axios";

export class AuthModule extends VueModuleRoot<typeof options> {
  ready() {
    this.actions.init();
  }
  request = axios.create();
}
```

#### step2:定义模块事件

/core/actions.ts

```ts
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
    return this.request("/login", { data });
  },
});
```

#### step3:模块核心导出

模块核心导出 /core/index.ts

```ts
import { AuthModule } from "./extends";

export * from "./actions";

export const { create, useAuthModule } = AuthModule.hook("AuthModule");
```

#### step4:添加UI组件

/components/LoginPage.vue

```vue
<template>
  <div>
    <input v-model="loginForm.name" />
    <input v-model="loginForm.password" />
    <button @click="authModule.actions.login(loginForm)">登录</button>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useAuthModule } from "..";

const authModule = useAuthModule();

const loginForm = reactive({
  name: "",
  password: "",
});
</script>
```

#### step5:导出UI

/components/index.ts

```ts
export { default as LoginPage } from "./LoginPage.vue";
```

/index.ts

```ts
export * from "./core";
export * as components from "./components";
```


## 模块使用

#### 默认加载

```vue
<template>
  <auth.components.LoginPage />
</template>

<script setup lang="ts">
import * as AuthModule from "./modules/auth";

const auth = AuthModule.create();
</script>
```

#### 按需加载

```vue
<template>
  <auth.components.LoginPage />
</template>

<script setup lang="ts">
import * as AuthModule from "./modules/auth/core";
import { LoginPage } from "./modules/auth/components";

const auth = AuthModule.create({
  components: {
    LoginPage, //除了按需加载，还可以选择自定义UI进行覆盖
  },
});
</script>
```