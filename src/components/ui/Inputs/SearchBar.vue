<template>
    <div class="bg-white p-2 flex gap-2 items-center rounded-lg shadow-md text-[#2E2E2E] font-['Nunito']">
        <Search size="16"/>
        <input type="text" class="w-full outline-none" placeholder="Buscar..." @input="handleInputChange"/>
    </div>
</template>
<script setup>

import { Search } from 'lucide-vue-next';
import { useFiltersStore } from '@/stores/useFiltersStore';

const filtersStore = useFiltersStore();

const emit = defineEmits(['search-changed']);

const handleInputChange = (event) => {
    filtersStore.setSearch(event.target.value);
    emit('search-changed', event.target.value);
};

</script>