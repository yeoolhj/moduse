# moduse

moduse 是一套基于 vue3 的渐进式模块化开发框架

- 支持渐进式的模块化开发，可以从零开始，也可以在已有的 vue3 项目中进行迭代。
- 通过简单的开发范式实现模块 typescript 完整的类型支持。
- 将模块与 UI 组件进行解耦，使得模块可以独立开发，通过 hooks 的方式实现模块在 UI 组件中的使用。
- 基于类的继承能力，可以自定义扩展模块的功能
- 通过依赖注入的方式实现模块的灵活配置

## 安装

```
npm install moduse
```

## 模块声明

新建一个模块目录，如 testModule，然后在 testModule 目录下创建以下文件：

#### Step1:定义模块 Class 类

/testModule/TestModule.ts

```ts
import axios from "axios";
import { ModuleRoot } from "moduse";
import { useRouter } from "vue-router";
import * as options from "./options"; // 后续创建的模块配置

export class TestModule extends ModuleRoot<typeof options> {
  request = axios.create(); // 自定义模块属性，如请求库
  router = useRouter(); // 自定义模块属性，如路由, 因为模块是在setup中创建的，所以可以使用第三方的hook函数
}
```

#### Step2:模块的入口文件

在 testModule 目录下创建 index.ts 文件作为模块的入口文件，导出模块的 create 方法和 use 方法。

/testModule/index.ts

```ts
import { TestModule } from "./TestModule";
import * as options from "./options";

export const { createTest, useTest } = TestModule.defineHooks(
  "Test", // 导出的方法名会根据传入的该参数值生成 如 create[参数值]：use[参数值]
  options
);
```

#### Step3:创建需要的模块配置

目前框架提供 config、store、actions、components、modules 五种依赖项，分别对应模块的配置、状态管理、事件、UI 组件、子模块依赖。

##### 模块配置

通过静态方法`defineConfig`创建
实例中通过`config` 属性来访问

/testModule/core/config.ts

```ts
import { TestModule } from "../TestModule";

export const config = TestModule.defineConfig({
  baseURL: "http://localhost:3000",
  moduleTitle: "模块A",
});
```

##### 模块事件

通过静态方法`defineActions`创建
实例中通过`actions` 属性来访问

事件函数中的 `this` 指向实例本身

/testModule/core/actions.ts

```ts
import { TestModule } from "../TestModule";

export const actions = TestModule.defineActions({
  async init() {
    const res = await this.actions.initUserInfo();
    console.log(res);
  },
  initUserInfo() {
    return this.request("/getUserInfo");
  },
  login(data: { name: string; password: string }) {
    return this.request("/login", {
      method: "POST",
      data,
    });
  },
});
```

`actions`中的方法都实现了订阅功能，可以通过实例的`on` 方法来监听事件，并在事件触发时执行回调函数

```html
<script setup lang="ts">
  import { useTest } from "@/modules/testModule";
  const test = useTest();
  test.actions.init();
  test.on("init:success", () => {
    // todo
  });
  test.on("init:fail", () => {
    // todo
  });
</script>
```

##### 模块状态管理

通过静态方法`defineStore`创建
实例中通过`store` 属性来访问

配置 API 参考了 Pinia, 但 `this` 改为了模块的实例

/testModule/core/actions.ts

```ts
import { TestModule } from "../TestModule";

export const store = TestModule.defineStore({
  state: () => ({
    userInfo: {},
  }),
  getters: {
    userId(state) {
      return state.userInfo.id;
    },
  },
  actions: {
    setUserInfo(userInfo: any) {
      this.store.userInfo = userInfo;
    },
  },
});
```

##### 子模块依赖

通过静态方法`defineModules`创建
实例中通过`modules` 属性来访问

如 TestModule 依赖了 B、C 模块，则 B、C 可以作为 TestModule 的子模块进行配置。

/testModule/core/modules.ts

```ts
import { TestModule } from "../TestModule";
import { createB, useB } from "@/modules/bModule";
import { createC, useC } from "@/modules/cModule";

export const modules = TestModule.defineModules({
  b: () => createB(), // create方法是创建一个新的B模块实例
  c: () => useC(), // use方法是获取一个已创建的C模块实例
});
```

#### Step4:定义模块配置入口文件

将第三步创建的模块的配置通过 export 统一导出。

/testModule/options.ts

```ts
// 这里需要注意的是导出的变量一定是 config、actions、store、modules、components，否则会关联不上正确的 ts 类型声明和默认配置。
export { config } from "./core/config";
export { actions } from "./core/actions";
export { modules } from "./core/modules";
export { store } from "./core/store";

// 若export的变量都是正确的，这里可以简写为
export * from "./core/config";
export * from "./core/actions";
export * from "./core/modules";
export * from "./core/store";
```

如果需要将 UI 组件也作为模块的注入配置，则可以将组件定义在 options.ts 文件中, 然后通过实例的 `components` 属性来进行访问。

/testModule/options.ts

```ts
import Component1 from "./components/Component1.vue";
...

export const components = {
  Component1,
  ...
};
```

> options.ts 创建完成后，整个模块的声明及功能才形成完整的闭环。所以真正开发模块的时候我们应该先创建好模块的每个配置文件的基本结构，并通过 options.ts 统一导出后，再去实现每个模块的具体功能，这样在开发过程中就可以享受到 ts 带来的强大的类型提示和代码提示功能。

## 模块实例化

可以在 App.vue 或者 需要使用的 vue 组件的 setup 中，通过模块暴露的 create 方法来创建模块实例。
不传参数时 ./options.ts 中的配置会作为模块的默认配置，传入参数时会根据传入的参数进行依赖注入。

```html
<template>
  <test1.components.Component1 />
</template>
<script setup lang="ts">
  import { createTest } from "@/modules/testModule";

  const test1 = createTest();
  test1.actions.init();

  const test2 = createTest({
    actions: {
      init() {
        conosle.log("init");
      },
    },
  });
</script>
```

## 模块引用

在模块实例化的组件及其子组件中，可以通过 useTest 方法来获取模块实例。

/testModule/components/Component1.vue

```html
<template>
  <div>{{ test.store.userId }}</div>
</template>
<script setup lang="ts">
  import { useTest } from "@/modules/testModule";

  const test = useTest();
</script>
```

## 自定义扩展模块

可以通过继承 ModuleRoot 类来自定义扩展模块，如添加自定义的静态方法、属性声明等。

`defineFuncFields` 框架提供的定义模块方法的静态函数，声明模块功能时，提供正确的 this 指向。
`useFuncFields` 在构造函数中对配置项进行绑定的函数，创建模块实例时，正确的实现函数的 this 指向。

/MyModuleRoot.ts

```ts
import {
  ModuleRoot,
  ModuleOptions,
  OptionsKeys,
  defineFuncFields,
  useFuncFields,
} from "moduse";

// 自定义的注入选项
type MyOptionsKeys = OptionsKeys | "utils";

export class MyModuleRoot<
  T extends ModuleOptions<MyOptionsKeys>
> extends ModuleRoot<T> {
  // 添加统一的请求库支持
  request = axios.create(); // 自定义模块属性，如请求库

  // 添加自定义的静态方法
  static defineUtils = defineFuncFields;

  // 添加自定义的属性声明
  utils: T["utils"];

  constructor(options: T) {
    super(options);
    // 绑定自定义的属性
    this.utils = useFuncFields.call(this, options.utils);
  }
}
```

使用自定义 ModuleRoot 创建模块

/testModule/TestModule.ts

```ts
import { MyModuleRoot } from "../MyModuleRoot";
import * as options from "./options";

export class TestModule extends MyModuleRoot<typeof options> {}
```

/testModule/core/utils.ts

```ts
import { TestModule } from "../TestModule";

const utils = TestModule.defineUtils({
  getToken() {
    return localStorage.getItem("token");
  },
});
```
