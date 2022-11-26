<template>
  <div>example1</div>
</template>
<script lang="ts" setup>
import { ExampleModule } from "@/modules/example";

const example = ExampleModule.create();

example.helper.getData(); // moduse,hello world
example.actions.updateName("developer"); //action: updateName developer
example.actions.updateDesc("welcome to moduse"); //action: updateDesc welcome to moduse
example.helper.getData(); // developer,welcome to moduse
</script>
