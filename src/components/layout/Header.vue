<template>
    <header class="bg-[#E8DCCB] flex justify-between items-center p-5 text-[#2E2E2E] border-[#999999] border-b-2 font-['Nunito']">
        <div class="order-1 md:hidden">
            <Menu class="h-9 md:h-6 w-9 md:w-6" @click="handleNavOptionMenuClick"/>
            <div v-if="navOptionMenu" class="absolute left-5 top-14 md:top-10 bg-white shadow-lg rounded-md px-4 py-3 w-52 flex flex-col gap-1">
                <nav class="flex flex-col divide-y divide-[#E6E6E6]">
                    <button v-for="genre in genres" class="bg-white text-center cursor-pointer py-2" @click="handleNavClick(genre.genre_name)">{{ genre.genre_name }}</button>
                </nav>
            </div>
        </div>
        <button class="cursor-pointer order-2 md:order-1" @click="handleLogoClick">Logo</button>
        <nav class="hidden md:flex md:items-center md:order-2">
            <button v-for="genre in genres" class="hover:bg-[#D4C4A8] p-3 text-lg rounded transition-colors duration-300 cursor-pointer" @click="handleNavClick(genre.genre_name)">{{ genre.genre_name }}</button>
        </nav>

        <div v-if="isAuthenticated" class="order-3 flex items-center gap-2">
            <button class="bg-white p-2 rounded-md hover:bg-black hover:text-white cursor-pointer hidden md:block transition-colors duration-300 relative" @click="handleCartClick">
                <ShoppingCart />
                <div class="absolute -top-1 -right-1 size-4 bg-black rounded-full flex items-center justify-center">
                    <p class="text-white text-xs">{{ user.cart }}</p>
                </div>
            </button>
            <div class="relative flex items-center justify-center">
                <button class="md:bg-white md:p-2 md:rounded-md md:hover:bg-black md:hover:text-white md:cursor-pointer transition-colors duration-300" @click="handleUserOptionsMenuClick">
                    <User class="h-9 md:h-6 w-9 md:w-6"/>
                </button>
                <div v-if="userOptionsMenu" class="absolute right-0 top-9 md:top-10 bg-white shadow-lg rounded-md px-4 py-3 w-52 flex flex-col gap-1 z-50">
                    <p class="text-center text-lg font-bold py-1">Nombre de usuario</p>
                    <div class="border border-b border-l-0 border-r-0 border-t py-1 flex flex-col">
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer transition-colors duration-300 p-1" @click="handleProfileClick">Mi perfil</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer p-1" @click="handleFavoritesClick">Mis favoritos</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer transition-colors duration-300 p-1" @click="handleOrdersClick">Mis compras</p>
                        <p class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer md:hidden p-1" @click="handleCartClick">Mi carrito</p>
                        <p v-if="isAdmin" class="hover:bg-[#E6E6E6] rounded-md text-center cursor-pointer p-1" @click="handleAdminClick">Administración</p>
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
                <Button label="Iniciar Sesión" color="gray" @click="handleLoginClick"/>
                <Button label="Registrarse" color="brown" @click="handleRegisterClick"/>
            </div>
        </div>
    </header>
</template>
<script setup>

import Button from '@/components/ui/Buttons/Button.vue';
import { Menu, User, CircleUser, ShoppingCart } from 'lucide-vue-next';
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { useGenreStore } from '@/stores/useGenresStore';
import { useFiltersStore } from '@/stores/useFiltersStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();

const authStore = useAuthStore();
const { user, isAuthenticated } = storeToRefs(authStore);

const genreStore = useGenreStore();
const { genres } = storeToRefs(genreStore);

const filtersStore = useFiltersStore();

const userOptionsMenu = ref(false);
const authOptionsMenu = ref(false);
const navOptionMenu = ref(false);
const showAdminOption = ref(false);

const isAdmin = computed(() => {
    if(!user.value) return false;
    return user.value.roles.find(role => role.role_id === 1 || role.role_id === 2) !== undefined;
});

watch(isAdmin, (newValue) => {
    showAdminOption.value = newValue;
});

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

    if(route.name == 'products') return;
    
    filtersStore.setGenre(genre);
    router.push({ name: 'products' });
} 

const handleLogoClick = () => {
    router.push({ name: 'home' });
};

const handleCartClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'cart' });
};

const handleProfileClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'myProfile' });
};

const handleFavoritesClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'favorites' });
};

const handleOrdersClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'myOrders' });
}

const handleAdminClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'admin' });
};

const handleLogoutClick = () => {
    handleUserOptionsMenuClick();
    router.push({ name: 'logout' });
}

const handleRegisterClick = () => {
    handleAuthOptionsMenuClick();
    router.push({ name: 'register' });
};

const handleLoginClick = () => {
    handleAuthOptionsMenuClick();
    router.push({ name: 'login' });
};

</script>