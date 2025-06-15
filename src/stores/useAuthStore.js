import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const isAuthenticated = ref(false);
    
    function setUser(newUser) {
        user.value = newUser;
        isAuthenticated.value = true;
    }
    
    function clearUser() {
        user.value = null;
        isAuthenticated.value = false;
    }
    
    return {
        user,
        isAuthenticated,
        setUser,
        clearUser
    };
})