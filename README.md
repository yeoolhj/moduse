# moduse

基于typescript提供模块封装的一种方案

## 特征

- moduse 只提供模块定义和使用的方法，定义怎样的模块由开发者自己决定
- 模块基于 class 语法定义，拥有优秀的扩展性
- 使用 typescript 开发，提供语法检查和推断
- moduse 不依赖框架, 在 vue、react 中均可使用

## 安装

```
npm install moduse
```

## 使用

#### 定义第一个模块

假设我们需要一个模块，有如下功能：

- data：存储字符串数据
- actions: 修改 data 的值
- helper: 提供一些帮助方法

开始定义这个模块
- `createDefine(handle)` 创建自命名的定义静态方法，通过泛型指定其类型，可传入 handle 函数编辑定义
- `createUse(name, handle?)` 创建自命名的配置定义的实例方法，通过 name 与定义的绑定，可传入 handle 函数编辑定义

```ts
// modules/extend.ts
import {
  createDefine,
  createInstance,
  DefineType,
  ModuleRoot,
} from "moduse";

type IData = DefineType<string>;
type IHelper = DefineType<(...args: any) => any>;
type IActions = DefineType<(...args: any) => any>;

export class MyModuleRoot extends ModuleRoot {
  static create = createInstance<"data" | "helper" | "actions">();
  static defineHelper = createDefine<IHelper>();
  static defineAction = createDefine<IActions>();

  data?: IData;
  helper?: IHelper;
  actions?: IActions;

  useData = this.createUse("data");
  useHelper = this.createUse("helper");
  useActions = this.createUse("actions", ([key, value]) => {
    return (...args: any) => {
      console.log("action:", key, ...args);
      value.call(this, ...args);
    };
  });
}

```

#### 定义子模块

```ts
// modules/example/index.ts
import { MyModuleRoot } from "../extend";

export class ExampleModule extends MyModuleRoot {
  data = this.useData({
    name: "moduse",
    desc: "hello world",
  });
  actions = this.useActions([action1, action2]);
  helper = this.useHelper(helper1);
}

const action1 = ExampleModule.defineAction({
  updateName(name: string) {
    this.data.name = name;
  },
});
const action2 = ExampleModule.defineAction({
  updateDesc(desc: string) {
    this.data.desc = desc;
  },
});

const helper1 = ExampleModule.defineHelper({
  getData() {
    const data = `${this.data.name},${this.data.desc}`;
    console.log(data);
    return data;
  },
});
```

#### 创建子模块实例

- 通过模块中定义的`create(options?)` 创建模块实例
- 通过`options`可以重写配置定义中的值

```ts
//pages/example1.vue
import { ExampleModule } from "@/modules/example";

const example = ExampleModule.create();

example.helper.getData(); // moduse,hello world
example.actions.updateName("developer"); //action: updateName developer
example.actions.updateDesc("welcome to moduse"); //action: updateDesc welcome to moduse
example.helper.getData(); // developer,welcome to moduse

//pages/example2.vue
import { ExampleModule } from "@/modules/example";

const example = ExampleModule.create({
  data: {
    desc: "welcome to example2",
  },
  actions: {
    updateDesc(desc) {
      this.data.desc = `${desc}(修改于${new Date().toISOString()})`;
    },
  },
  helper: {
    getData(): string {
      const data = `${this.data.desc},${this.data.name}`;
      console.log(data);
      return data;
    },
  },
});

example.helper.getData(); // welcome to example2,example
example.actions.updateName("example2"); // action: updateName example2
example.actions.updateDesc("创建实例时可修改已配置的定义"); // action: updateDesc 创建实例时可修改已配置的定义
example.helper.getData(); // 创建实例时可修改已配置的定义（修改于xxxx）,example2
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
        moduleRoot: "MyModuleRoot", // 自定义的模块名,可传入多个以“|”（如 MyModuleRoot1|MyModuleRoot2）隔开
        include: [path.resolve(__dirname, "./src/modules")]
      },
    },
    ...
  ],
},
```
