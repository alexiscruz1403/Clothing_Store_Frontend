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
        <Modal :title="modal.title" :description="modal.description" :type="modal.type" :visibility="modal.visibility" />
        <Footer />
    </div>
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import Modal from '@/components/ui/Modals/Modal.vue';
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { errorObjectToString } from '@/utils/errorObjectToString';
import router from '@/router';

const authStore = useAuthStore();

const modal = reactive({
    title: 'Cerrando sesión',
    description: 'Por favor, espera mientras se cierra tu sesión.',
    type: 'waiting',
    visibility: false
});

const logoutSuccess = ref(false);

const handleLogout = async () => {
    modal.visibility = true;
    try{
        await authStore.logoutUser();
        modal.title = 'Sesión cerrada';
        modal.description = 'Has cerrado sesión correctamente.';
        modal.type = 'success';
        logoutSuccess.value = true;
    }catch (error) {
        modal.title = error.response.data.message;
        modal.description = errorObjectToString(error.response.data.errors);
        modal.type = 'error';
    }finally{
        setTimeout(() => {
            modal.visibility = false;
            if(logoutSuccess.value) router.push({ name: 'home' });
        }, 2000);
    }
}

</script>