<template>
  <div>example5</div>
</template>
<script lang="ts" setup>
import { useExample } from "@/modules/example";

const example = useExample();

example.helper.getData(); // welcome to example2,example
example.actions.updateName("example2"); // action: updateName example2
example.actions.updateDesc("创建实例时可修改已配置的定义"); // action: updateDesc 创建实例时可修改已配置的定义
example.helper.getData(); // 创建实例时可修改已配置的定义（修改于xxxx）,example2
</script>
