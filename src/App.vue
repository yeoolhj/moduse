<template>
  <auth.components.LoginPage />
</template>

<script setup lang="ts">
import { createAuthModule } from "./modules/auth";
import LoginForm from "./views/LoginForm.vue";

const auth = createAuthModule({
  components: {
    LoginPage: LoginForm,
  },
});
</script>
