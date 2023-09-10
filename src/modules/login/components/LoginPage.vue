<script setup lang="ts">
import { reactive } from "vue";
import { useLoginModule } from "..";
const loginModule = useLoginModule();

const loginForm = reactive({
  username: "",
  password: "",
});
</script>

<template>
  <div class="login-box">
    <input v-model="loginForm.username" />
    <input v-model="loginForm.password" />
    <button @click="loginModule.actions.pwdLogin(loginForm)">登录</button>
  </div>
</template>

<style scoped>
.login-box {
  display: flex;
  flex-direction: column;
}
</style>
