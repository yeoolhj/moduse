<template>
  <login.components.LoginPage />
</template>

<script setup lang="ts">
import * as AuthModule from "./modules/auth";

const auth = AuthModule.create();
const { login } = auth.modules;
</script>
