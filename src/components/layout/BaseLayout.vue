<template>
    <div class="min-h-screen flex flex-col justify-between">
        <Header />
        <main class="bg-[#E8DCCB] font-['Nunito'] text-[#2E2E2E] flex flex-col items-center py-5 grow-1">
            <slot />
        </main>
        <Footer />  
    </div>
</template>
<script setup>

import Header from './Header.vue';
import Footer from './Footer.vue';

</script>