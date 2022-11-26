<template>
  <div>example4</div>
  <Example5 />
</template>
<script lang="ts" setup>
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
</script>
