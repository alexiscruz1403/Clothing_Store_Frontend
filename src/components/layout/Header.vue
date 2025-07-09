<template>
    <header class="bg-[#E8DCCB] flex justify-between items-center p-5 text-[#2E2E2E] border-[#999999] border-b-2 font-['Nunito']">
        <div class="order-1 md:hidden">
            <Menu class="h-9 md:h-6 w-9 md:w-6" @click="handleNavOptionMenuClick"/>
            <div v-if="navOptionMenu" class="absolute left-5 top-14 md:top-10 bg-white shadow-lg rounded-md px-4 py-3 w-52 flex flex-col gap-1">
                <nav class="flex flex-col divide-y divide-[#E6E6E6]">
                    <button v-for="genre in genres" class="bg-white text-center cursor-pointer py-2" @click="handleNavClick(genre)">{{ genre }}</button>
                </nav>
            </div>
        </div>
        <button class="cursor-pointer order-2 md:order-1" @click="handleLogoClick">Logo</button>
        <nav class="hidden md:flex md:items-center md:order-2">
            <button v-for="genre in genres" class="hover:bg-[#D4C4A8] p-3 text-lg rounded transition-colors duration-300 cursor-pointer" @click="handleNavClick(genre.genre_name)">{{ genre.genre_name }}</button>
        </nav>

        <div v-if="user" class="order-3 flex items-center gap-2">
            <button class="bg-white p-2 rounded-md hover:bg-black hover:text-white cursor-pointer hidden md:block transition-colors duration-300" @click="handleCartClick">
                <ShoppingCart />
            </button>
            <div class="relative flex items-center justify-center">
                <button class="md:bg-white md:p-2 md:rounded-md md:hover:bg-black md:hover:text-white md:cursor-pointer transition-colors duration-300" @click="handleUserOptionsMenuClick">
                    <User class="h-9 md:h-6 w-9 md:w-6"/>
                </button>
                <div v-if="userOptionsMenu" class="absolute right-0 top-9 md:top-10 bg-white shadow-lg rounded-md px-4 py-3 w-52 flex flex-col gap-1">
                    <p class="text-center text-lg font-bold py-1">Nombre de usuario</p>
                    <div class="border border-b border-l-0 border-r-0 border-t py-1 flex flex-col">
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer transition-colors duration-300 p-1">Mi perfil</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer p-1" @click="handleFavoritesClick">Mis favoritos</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer transition-colors duration-300 p-1">Mis compras</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer md:hidden p-1">Mi carrito</p>
                    </div>
                    <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer py-1 transition-colors duration-300" @click="handleLogoutClick">Cerrar sesión</p>
                </div>
            </div>  
        </div>
        <div v-else class="order-3">
            <div>
                <CircleUser class="h-9 w-9 md:h-6 md:w-6 md:hidden" @click="handleAuthOptionsMenuClick"/>
                <div v-if="authOptionsMenu" class="absolute right-5 top-14 md:top-10 bg-white shadow-lg rounded-md px-4 py-3 w-52 flex flex-col gap-1">
                    <div>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer py-1" @click="handleLoginClick">Iniciar sesión</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer py-1" @click="handleRegisterClick">Registrarse</p>
                    </div>
                </div>
            </div>
            <div class="hidden md:flex gap-2">
                <Button type="gray" label="Iniciar Sesión" :onClick="handleLoginClick"/>
                <Button type="brown" label="Registrarse" :onClick="handleRegisterClick"/>
            </div>
        </div>
    </header>
</template>
<script setup>

import { ref } from 'vue';

import Button from '@/components/ui/Buttons/Button.vue';
import { Menu, User, CircleUser, ShoppingCart } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGenreStore } from '@/stores/useGenresStore';
import { storeToRefs } from 'pinia';
import router from '@/router'; 

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const genreStore = useGenreStore();
const { genres } = storeToRefs(genreStore);

const userOptionsMenu = ref(false);
const authOptionsMenu = ref(false);
const navOptionMenu = ref(false);

const handleUserOptionsMenuClick = () => {
    userOptionsMenu.value = !userOptionsMenu.value;
};

const handleAuthOptionsMenuClick = () => {
    authOptionsMenu.value = !authOptionsMenu.value;
};

const handleNavOptionMenuClick = () => {
    navOptionMenu.value = !navOptionMenu.value;
};

const handleNavClick = (genre) => {
    handleNavOptionMenuClick();
    router.push({ name: 'products' });
} 

const handleLogoClick = () => {
    router.push({ name: 'home' });
};

const handleCartClick = () => {
    router.push({ name: 'cart' });
};

const handleFavoritesClick = () => {
    router.push({ name: 'favorites' });
};

const handleRegisterClick = () => {
    router.push({ name: 'register' });
};

const handleLoginClick = () => {
    router.push({ name: 'login' });
};

const handleLogoutClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'logout' });
}

</script>