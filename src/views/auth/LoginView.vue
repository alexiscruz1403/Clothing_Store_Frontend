<template>
    <div class="flex flex-col justify-between min-h-screen bg-[#E8DCCB]">
        <Header />
        <main class="px-5 md:px-0 flex items-center justify-center text-[#2E2E2E] font-['Nunito']">
            <form class="bg-white w-md p-4 rounded-lg shadow-lg flex flex-col gap-4" @submit.prevent="handleSubmit">
                <h1 class="text-2xl text-center">Iniciar sesión</h1>
                <div class="flex flex-col gap-3">
                    <Input v-model="form.email" type="text" label="Correo Electrónico" placeholder="Ingrese su nombre" :required="true" :error="emailError"/>
                    <Input v-model="form.password" type="password" label="Contraseña" placeholder="Ingrese su nombre" :required="true" :error="passwordError"/>
                    <Button type="primary" label="Enviar" />
                </div>
                <div class="text-sm">
                    <p class="text-center">¿Aún no tienes una cuenta? Ve a <a href="/register" class="text-blue-600">registrarse</a></p>
                    <p class="text-center">¿Olvidaste tu contraseña? Ve a <a href="/recover" class="text-blue-600">cambiar contraseña</a></p>
                </div> 
            </form>
        </main>
        <Footer />
    </div>
</template>
<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Input from '@/components/ui/Inputs/Input.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import { reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, alpha, numeric } from '@vuelidate/validators'

const authStore = useAuthStore();

const form = reactive({
    email: '',
    password: ''
});

const rules = {
    email: { required, email, maxLength: maxLength(255) },
    password: { required, minLength: minLength(8) }
};

const v$ = useVuelidate(rules, form);

const emailError = computed(() => {
    if (!v$.value.email.$dirty) return ''
    if (v$.value.email.required.$invalid) return 'El correo es obligatorio'
    if (v$.value.email.email.$invalid) return 'Debe ser un correo válido'
    return ''
})

const passwordError = computed(() => {
    if (!v$.value.password.$dirty) return ''
    if (v$.value.password.required.$invalid) return 'La contraseña es obligatoria'
    if (v$.value.password.minLength.$invalid) return 'La contraseña debe tener al menos 8 caracteres'
    return ''
})

const handleSubmit = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    authStore.setUser({username: 'alexis'});
};

</script>