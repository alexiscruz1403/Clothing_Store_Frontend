import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { validate, login, register, logout } from '../api/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);

    const isAuthenticated = ref(false);

    watch(user, (newValue) => {
        isAuthenticated.value = newValue !== null;
    });

    const validateSession = async () => {
        try {
            const response = await validate();
            user.value = response.data;
        } catch (error) {
            user.value = null;
        }
    }

    const loginUser = async (userData) => {
        try{
            const response = await login(userData);
            console.log(response);
            user.value = response;
        }catch(error){
            user.value = null;
            throw error;
        }
    }

    const registerUser = async (userData) => {
        try {
            const response = await register(userData);
            user.value = response;
        } catch (error) {
            user.value = null;
            throw error;
        }
    }

    const logoutUser = async () => {
        try {
            await logout();
            user.value = null;
        } catch (error) {
            throw error;
        }
    }

    const updateUser = (newUserData) => {
        user.value = { ...user.value, ...newUserData };
    }

    return{
        user,
        isAuthenticated,
        validateSession,
        loginUser,
        registerUser,
        logoutUser,
        updateUser
    }
});