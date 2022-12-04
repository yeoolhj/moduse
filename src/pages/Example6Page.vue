<template>
  <div>{{ example.state.info.name }}</div>
  <div>{{ example.state.info.description }}</div>
  <Example6Comp />
</template>

<script lang="ts" setup>
import { initExample } from "@/modules/example6";
import Example6Comp from "./components/Example6Comp.vue";

const example = initExample({
  config: {
    defaultInfo: {
      name: "example6",
      description: "在vue3中基于自定义的ModuleRoot",
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
