<template>
    <div class="flex items-center justify-center w-[90%] md:w-full">
        <form class="bg-white w-md p-4 rounded-lg shadow-lg flex flex-col gap-4" @submit.prevent="handleSubmit">
            <h1 class="text-2xl text-center">Iniciar sesión</h1>
            <div class="flex flex-col gap-3">
                <Input v-model="form.email" type="text" label="Correo Electrónico" placeholder="Ingrese su nombre" :required="true" :error="emailError"/>
                <Input v-model="form.password" type="password" label="Contraseña" placeholder="Ingrese su nombre" :required="true" :error="passwordError"/>
                <Button 
                    color="primary" 
                    label="Enviar" 
                    size="large" 
                    type="submit"
                />
            </div>
            <div class="text-sm">
                <p class="text-center">¿Aún no tienes una cuenta? Ve a <a href="/register" class="text-blue-600">registrarse</a></p>
                <p class="text-center">¿Olvidaste tu contraseña? Ve a <a href="/recover" class="text-blue-600">cambiar contraseña</a></p>
            </div> 
        </form>
    </div>
    <Modal :title="modal.title" :description="modal.description" :type="modal.type" :visibility="modal.visibility"/> 
</template>
<script setup>

import Input from '@/components/ui/Inputs/Input.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import Modal from '@/components/ui/Modals/Modal.vue';
import { ref, reactive, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/useAuthStore';
import { errorObjectToString } from '@/utils/errorObjectToString';
import router from '@/router';

const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

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

const loginSuccess = ref(false);

const modal = reactive({
    title: 'Iniciando sesión',
    description: 'Por favor, espere mientras iniciamos sesión...',
    type: 'waiting',
    visibility: false
});

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    modal.visibility = true;
    try{
        await authStore.loginUser(form);
        modal.title = 'Bienvenido nuevamente';
        modal.description = 'Has iniciado sesión correctamente.';
        modal.type = 'success';
        loginSuccess.value = true;
    }catch(error){
        modal.title = error.response.data.message;
        modal.description = errorObjectToString(error.response.data.errors);
        modal.type = 'error';
    }finally{
        setTimeout(() => {
            modal.visibility = false;
            modal.title = 'Iniciando sesión';
            modal.description = 'Por favor, espere mientras iniciamos sesión...';
            modal.visibility = 'waiting';
            if(loginSuccess.value) router.push({ name: 'home' });
        }, 2000);
    }
};

onMounted(() => {
    if(isAuthenticated.value) router.push({ name: 'home' });
});

</script>