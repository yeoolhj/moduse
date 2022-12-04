# vue-moduse

基于 vue3 的 composition 语法使用 moduse

## 安装

```
npm install moduse vue-moduse
```

## 使用

- `createHook(Module, Name)` 根据传入的 Name 生成 3 个 compositionApi
  - `set{Name}Options()` 在模块实例化之前生成默认模块配置
  - `init{Name}(options?)` 模块实例化方法, options 参数同`MyModuleRoot.create(options)`
  - `use{Name}()` 模块实例化后在子组件中可调用
  -

```ts
//modules/example5/index.ts
...
import { createHook } from "vue-moduse";


export class ExampleModule extends MyModuleRoot {
  ...
}

export const { useExample, initExample, setExampleOptions } = createHook(
  ExampleModule,
  "Example"
);
```

页面中使用

```ts
// pages/Example5Page.vue
<template>
  <div>{{ example.state.info.name }}</div>
  <div>{{ example.state.info.description }}</div>
  <Example5Comp />
</template>

<script lang="ts" setup>
import { initExample } from "@/modules/example5";
import Example5Comp from "./components/Example5Comp.vue";

const example = initExample({
  config: {
    defaultInfo: {
      name: "example5",
      description: "自定义继承模块",
    },
  },
  actions: {
    addLog(date: Date) {
      this.state.logs.push(date.toISOString());
    },
    updateLog(index: number, date: Date) {
      this.state.logs[index] = date.toISOString();
    },
  },
});
</script>

//pages/components/Example5Comp.vue
<template>
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
import { useExample } from "@/modules/example5";

const example = useExample();

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

基于自定义抽象模块使用

```ts
// modules/extends/VueModuleRoot.ts
...
import { createHook } from "vue-moduse";

export class VueModuleRoot extends ModuleRoot {
  static hook<T extends typeof ModuleRoot, S extends Capitalize<string>>(
    this: T,
    name: S
  ) {
    return createHook(this, name);
  }
  ...
}

// modules/example6/index.ts
...

export class ExampleModule extends MyModuleRoot {
  ...
}

export const { useExample, initExample, setExampleOptions } =
  ExampleModule.hook("Example");
```
