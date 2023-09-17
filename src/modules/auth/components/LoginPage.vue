<template>
  <div class="login-content">
    <input v-model="loginForm.name" />
    <input v-model="loginForm.password" />
    <button @click="authModule.actions.login(loginForm)">登录</button>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useAuthModule } from "..";

const authModule = useAuthModule();

const loginForm = reactive({
  name: "",
  password: "",
});
</script>
<style scoped>
.login-content {
  display: flex;
  flex-direction: column;
}
</style>
