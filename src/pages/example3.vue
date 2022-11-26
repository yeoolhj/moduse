<template>
  <div>example3</div>
</template>
<script lang="ts" setup>
import { initExample } from "@/modules/example";

const example = initExample();

example.helper.getData(); // moduse,hello world
example.actions.updateName("developer"); //action: updateName developer
example.actions.updateDesc("welcome to moduse"); //action: updateDesc welcome to moduse
example.helper.getData(); // developer,welcome to moduse
</script>
