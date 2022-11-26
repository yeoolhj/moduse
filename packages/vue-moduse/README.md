# vue-moduse

基于 vue3 的 composition 语法使用 moduse

## 安装

```
npm install vue-moduse
```

## 使用

- 根模块中添加静态方法`hook`
- 子模块中通过该方法生成 3 个 compositionApi
- `set{Name}Options()` 在模块实例化之前生成默认模块配置
- `init{Name}(options?)` 模块实例化方法, options 参数同`MyModuleRoot.create(options)`
- `use{Name}()` 模块实例化后在子组件中可调用
- 只能在setup中使用

```ts
//modules/extend.ts
import { createHook } from "vue-moduse";

export class MyModuleRoot extends ModuleRoot {
  static hook<T extends typeof ModuleRoot, S extends Capitalize<string>>(
    this: T,
    name: S
  ) {
    return createHook(this, name);
  }
  ...
}

//modules/example/index.ts
class ExampleModule extends MyModuleRoot {
  ...
}

export const { useExample, initExample, setExampleOptions } =
  ExampleModule.hook("Example");
```

页面中使用
```ts
//pages/example3.vue setup
import { initExample } from "@/modules/example";

const example = initExample();

example.helper.getData(); // moduse,hello world
example.actions.updateName("developer"); //action: updateName developer
example.actions.updateDesc("welcome to moduse"); //action: updateDesc welcome to moduse
example.helper.getData(); // developer,welcome to moduse

//pages/example4.vue setup
import { initExample } from "@/modules/example";
import Example5 from "./example5.vue";

initExample({
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

//pages/example5.vue setup
import { useExample } from "@/modules/example";

const example = useExample();

example.helper.getData(); // welcome to example2,example
example.actions.updateName("example2"); // action: updateName example2
example.actions.updateDesc("创建实例时可修改已配置的定义"); // action: updateDesc 创建实例时可修改已配置的定义
example.helper.getData(); // 创建实例时可修改已配置的定义（修改于xxxx）,example2
```