<script setup>

import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import BaseLayout from './components/layout/BaseLayout.vue';
import { useAuthStore } from './stores/useAuthStore';

const authStore = useAuthStore();

onMounted(async () => {
  authStore.validateSession();
});

</script>

<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>
