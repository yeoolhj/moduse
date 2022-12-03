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
