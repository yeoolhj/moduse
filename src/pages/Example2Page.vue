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
