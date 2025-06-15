<template>
    <div class="flex flex-col justify-between min-h-screen bg-[#E8DCCB]">
        <Header />
        <main class="px-5 md:px-0 flex items-center justify-center text-[#2E2E2E] font-['Nunito']">
            <div class="bg-white w-md p-4 rounded-lg shadow-lg flex flex-col gap-4">
                <h1 class="text-2xl text-center">Cerrar sesión</h1>
                <p class="text-center">¿Estás seguro que quieres cerrar sesión?</p>
                <Button type="primary" label="Aceptar" :onClick="handleLogout"/>
            </div>
        </main>
        <Footer />
    </div>
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import { useAuthStore } from '@/stores/useAuthStore';

const authStore = useAuthStore();

const handleLogout = () => {
    authStore.clearUser();
}

</script>