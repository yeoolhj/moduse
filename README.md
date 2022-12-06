# moduse

基于 typescript 提供对 Model-View-ViewModel(MVVM)模式中 Model 层模块化封装的一种方案

## 安装

```
npm install moduse
```

## 使用

#### 封装一个模块

- `ModuleRoot` 定义模块时需要继承的抽象类
- `use(define)` 继承自 ModuleRoot 的实例方法来配置模块定义
- `create()` 继承自 ModuleRoot 的静态方法来实例化模块

```ts
// modules/example1/index.ts
import axios from "axios";
import { ModuleRoot } from "moduse";
import { reactive } from "vue";

const defaultInfo = {
  name: "example1",
  description: "this is single example",
};

export class ExampleModule extends ModuleRoot {
  // 配置一个双向绑定的数据模型，该示例使用基于vue3的reactive
  state = reactive({
    info: { ...defaultInfo },
  });

  // 配置一个请求实例
  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置操作模块数据的业务逻辑
  actions = this.use({
    async initInfo() {
      const res = await this.https.getInfo();
      if (res.status === 200) {
        this.state.info = res.data;
      }
    },
    async updateInfo(info: typeof defaultInfo) {
      this.state.info = info;
    },
  });

  // 配置获取/设置该模块数据的请求接口
  https = this.use({
    getInfo() {
      return this.request.get("/getInfo");
    },
  });
}

// pages/Example1Page.vue
<template>
  <div>{{ example.state.info.name }}</div>
  <div>{{ example.state.info.description }}</div>
  <button @click="updateInfo">更新Info</button>
</template>

<script lang="ts" setup>
import { ExampleModule } from "@/modules/example1";
import { onMounted } from "vue";

// 通过create方法实例化模块
const example = ExampleModule.create();

onMounted(() => {
  example.actions.initInfo();
});

function updateInfo() {
  example.actions.updateInfo({
    name: "示例1",
    description: "hello, world",
  });
}
</script>

```

#### 模块的拆分

随着模块功能越来越多，需要将模块拆分成一个个小的文件

- `define()` 继承自 ModuleRoot 的静态方法来定义模块属性

```ts
// modules/example2/index.ts
import axios from "axios";
import { ModuleRoot } from "moduse";
import { reactive } from "vue";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { https } from "./https";

export type InfoType = typeof defaultInfo;

const defaultInfo = {
  name: "example2",
  description: "this is single example2",
};

export class ExampleModule extends ModuleRoot {
  state = reactive({
    info: { ...defaultInfo },
    logs: [] as string[],
  });

  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置操作模块数据的业务逻辑infoAction和logsAction
  // 支持传入解构对象或者数组, vue中由于ts支持问题建议使用解构对象
  actions = this.use({ ...infoAction, ...logsAction });

  https = this.use(https);
}

// modules/example2/https.ts
import { ExampleModule } from ".";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const https = ExampleModule.define({
  getInfo() {
    return this.request.get("/getInfo");
  },
});

// modules/example2/actions/info.ts
import { ExampleModule, InfoType } from "..";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const infoAction = ExampleModule.define({
  async initInfo() {
    const res = await this.https.getInfo();
    if (res.status === 200) {
      this.state.info = res.data;
    }
  },
  async updateInfo(info: InfoType) {
    this.state.info = info;
  },
});
// modules/example2/actions/logs.ts
import { ExampleModule } from "..";

// 通过模块的define方法定义模块相关业务逻辑，this指该向该模块实例
export const logsAction = ExampleModule.define({
  addLog(date: Date) {
    this.state.logs.push(date.toDateString());
  },
  removeLog(index: number) {
    this.state.logs.splice(index, 1);
  },
  updateLog(index: number, date: Date) {
    this.state.logs[index] = date.toDateString();
  },
});

// pages/Example2Page.vue
<template>
  <div>example2</div>
  <div>
    <button @click="addLog">添加log</button>
    <button @click="removeFirstLog">删除第一个log</button>
    <button @click="updateLastLog">更新最后一个log</button>
  </div>
  <div>
    <div :key="i" v-for="(date, i) in example.state.logs">
      第{{ i + 1 }}条: {{ date }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ExampleModule } from "@/modules/example2";

const example = ExampleModule.create();

function addLog() {
  example.actions.addLog(new Date());
}
function removeFirstLog() {
  example.actions.removeLog(0);
}
function updateLastLog() {
  example.actions.updateLog(example.state.logs.length - 1, new Date());
}
</script>
```

#### 模块的初始化配置

- `createInstance` 定义模块的 create 静态方法，通过泛型声明初始化的配置
- `createOptionsKey` this.use(define, options)中 options 的字段，让该 define 支持初始化配置

```ts
import axios from "axios";
import { createInstance, ModuleRoot } from "moduse";
import { reactive } from "vue";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { https } from "./https";

export type InfoType = typeof defaultInfo;

const defaultInfo = {
  name: "example",
  description: "this is single example",
};

export class ExampleModule extends ModuleRoot {
  // ExampleModule.create覆盖ModuleRoot.create, 通过泛型配置调用create方法时可以传入的options字段
  // 在初始化时，可重写配置了createOptionsKey的模块定义的内容
  static create = createInstance<"actions" | "https">();

  state = reactive({
    info: { ...defaultInfo },
    logs: [] as string[],
  });

  request = axios.create({ baseURL: "http://localhost:8000/api" });

  // 配置第二个参数options的createOptionsKey字段, 让actions可初始化配置
  actions = this.use(
    { ...infoAction, ...logsAction },
    {
      createOptionsKey: "actions",
    }
  );

  // 通过配置第二个参数options的createOptionsKey字段, 让https可初始化配置
  https = this.use(https, { createOptionsKey: "https" });
}

// pages/Example3Page.vue
<template>
  <div>{{ example.state.info.name }}</div>
  <div>{{ example.state.info.description }}</div>
  <div>
    <button @click="addLog">添加log</button>
    <button @click="removeFirstLog">删除第一个log</button>
    <button @click="updateLastLog">更新最后一个log</button>
  </div>
  <div>
    <div :key="i" v-for="(date, i) in example.state.logs">
      第{{ i + 1 }}条: {{ date }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ExampleModule } from "@/modules/example3";
import { AxiosResponse } from "axios";

// 实例化时可配置模块的部分定义
const example = ExampleModule.create({
  actions: {
    addLog(date: Date) {
      this.state.logs.push(date.toISOString());
    },
    updateLog(index: number, date: Date) {
      this.state.logs[index] = date.toISOString();
    },
  },
  https: {
    getInfo() {
      return Promise.resolve({
        status: 200,
        data: {
          name: "example3",
          description: "通过options进行实例的配置",
        },
      } as AxiosResponse<any, any>);
    },
  },
});

example.actions.initInfo();

function addLog() {
  example.actions.addLog(new Date());
}
function removeFirstLog() {
  example.actions.removeLog(0);
}
function updateLastLog() {
  example.actions.updateLog(example.state.logs.length - 1, new Date());
}
</script>
```

#### 自定义抽象模块

- `createDefine` 为模块添加自定义的定义方法，通过泛型限定该定义的内容
- `this.createUse(createOptionsKey, options?)` 为模块添加自定义的配置方法，默认绑定 createOptionsKey
- 配置webpack `options.moduleRoot: "MyModuleRoot"`

```ts
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { createDefine, createInstance, DefineType, ModuleRoot } from "moduse";

type IConfig = { requestConfig?: AxiosRequestConfig } & { [name: string]: any };
type IActions = DefineType<(...args: any) => any>;
type IHttps = DefineType<(...args: any) => Promise<AxiosResponse<any, any>>>;

export class MyModuleRoot extends ModuleRoot {
  static create = createInstance<"config" | "actions" | "https">();

  // 通过createDefine方法, 为模块添加自定义的定义方法，通过泛型限定该定义的内容
  static defineConfig = createDefine<IConfig>();
  static defineAction = createDefine<IActions>();
  static defineHttp = createDefine<IHttps>();

  config?: IConfig;
  actions?: IActions;
  https?: IHttps;

  // 通过this.createUse方法，为模块添加自定义的配置方法，默认绑定createOptionsKey,
  useConfig = this.createUse("config");
  useHttps = this.createUse("https");
  // 配置第二个参数options的handle字段, 可添加一些默认逻辑
  useActions = this.createUse("actions", {
    handle: ([key, value]) => {
      return (...args: any) => {
        console.log("action:", key, ...args);
        value.call(this, ...args);
      };
    },
  });
}

// modules/example4/index.ts
import axios from "axios";
import { reactive } from "vue";
import { infoAction } from "./actions/info";
import { logsAction } from "./actions/logs";
import { config } from "./config";
import { MyModuleRoot } from "../extends/MyModuleRoot";
import { https } from "./https";

export type InfoType = { name: string; description: string };

export class ExampleModule extends MyModuleRoot {
  // 通过自定义的suseConfig方法配置config
  config = this.useConfig(config);

  state = reactive({
    // 基于config配置初始化info
    info: { ...this.config.defaultInfo },
    logs: [] as string[],
  });

  // 基于config配置实例化axios
  request = axios.create(this.config.requestConfig);

  // 通过自定义的useActions方法配置actions
  actions = this.useActions({ ...infoAction, ...logsAction });

  // 通过自定义的useHttps方法配置https
  https = this.useHttps(https);
}

// pages/Example4Page.vue
<template>
  <div>{{ example.state.info.name }}</div>
  <div>{{ example.state.info.description }}</div>
  <div>
    <button @click="addLog">添加log</button>
    <button @click="removeFirstLog">删除第一个log</button>
    <button @click="updateLastLog">更新最后一个log</button>
  </div>
  <div>
    <div :key="i" v-for="(date, i) in example.state.logs">
      第{{ i + 1 }}条: {{ date }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ExampleModule } from "@/modules/example4";

const example = ExampleModule.create({
  config: {
    defaultInfo: {
      name: "example4",
      description: "自定义继承模块"
    }
  },
  actions: {
    addLog(date: Date) {
      this.state.logs.push(date.toISOString());
    },
    updateLog(index: number, date: Date) {
      this.state.logs[index] = date.toISOString();
    },
  }
});

function addLog() {
  example.actions.addLog(new Date());
}
function removeFirstLog() {
  example.actions.removeLog(0);
}
function updateLastLog() {
  example.actions.updateLog(example.state.logs.length - 1, new Date());
}
</script>

```

## webpack 配置

```js
{
  test: /\.ts$/,
  use: [
    ...
    // 放在ts-loader之前
    {
      loader: 'moduse/webpack-loader',
      options: {
        abstractModule: "ModuleRoot", // 抽象模块名,可传入多个以“|”（如 ModuleRoot|MyModuleRoot）隔开
        include: [path.resolve(__dirname, "./src/modules")]
      },
    },
    ...
  ],
},
```
