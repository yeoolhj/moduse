<template>
  <div>example2</div>
</template>
<script lang="ts" setup>
import { ExampleModule } from "@/modules/example";

const example = ExampleModule.create({
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

example.helper.getData(); // welcome to example2,example
example.actions.updateName("example2"); // action: updateName example2
example.actions.updateDesc("创建实例时可修改已配置的定义"); // action: updateDesc 创建实例时可修改已配置的定义
example.helper.getData(); // 创建实例时可修改已配置的定义（修改于xxxx）,example2
</script>
