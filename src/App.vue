<template>
  <loginModule.components.LoginPage />
</template>

<script setup lang="ts">
import * as LoginModule from "./modules/login";

const loginModule = LoginModule.create();
</script>
