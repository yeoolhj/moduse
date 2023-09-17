<template>
  <auth.components.LoginPage />
</template>

<script setup lang="ts">
import * as AuthModule from "./modules/auth";
import LoginForm from "./views/LoginForm.vue";

const auth = AuthModule.create({
  components: {
    LoginPage: LoginForm,
  },
});
</script>
