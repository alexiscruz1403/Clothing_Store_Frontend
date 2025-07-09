<script setup>

import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import BaseLayout from './components/layout/BaseLayout.vue';
import { useAuthStore } from './stores/useAuthStore';
import { useGenreStore } from './stores/useGenresStore';
import { useCategoriesStore } from './stores/useCategoriesStore';

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
