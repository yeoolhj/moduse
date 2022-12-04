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
      description: "在vue3中使用",
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
