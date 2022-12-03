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
