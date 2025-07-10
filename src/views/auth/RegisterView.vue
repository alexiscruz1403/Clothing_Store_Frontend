<template>
    <div class="flex items-center justify-center w-[90%] md:w-full">
        <form class="bg-white w-md p-4 rounded-lg shadow-lg flex flex-col gap-4" @submit.prevent="handleSubmit">
            <h1 class="text-2xl text-center">Registrarse</h1>
            <div class="flex flex-col gap-3">
                <Input v-model="form.username" type="text" label="Nombre" placeholder="Ingrese su nombre" :required="true" :error="usernameError"/>
                <Input v-model="form.email" type="text" label="Correo Electrónico" placeholder="Ingrese su nombre" :required="true" :error="emailError"/>
                <Input v-model="form.password" type="password" label="Contraseña" placeholder="Ingrese su nombre" :required="true" :error="passwordError"/>
                <Input v-model="form.address" type="text" label="Dirección" placeholder="Ingrese su nombre" :error="addressError"/>
                <Input v-model="form.phone" type="text" label="Número de telefóno" placeholder="Ingrese su nombre" :error="phoneError"/>
                <Button type="primary" label="Registrarse" />
            </div>
            <div class="text-sm">
                <p class="text-center">¿Ya tienes una cuenta? Ve a <a href="/login" class="text-blue-600">iniciar sesión</a></p>
                <p class="text-center">Al registrarte aceptas nuestros <a href="/terms" class="text-blue-600">términos y condiciones</a></p>
            </div> 
        </form>
    </div>
    <Modal :title="modal.title" :description="modal.description" :type="modal.type" :visibility="modal.visibility"/>
</template>
<script setup>

import Input from '@/components/ui/Inputs/Input.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import Modal from '@/components/ui/Modals/Modal.vue';
import { ref, reactive, computed } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, alpha, numeric } from '@vuelidate/validators'
import { errorObjectToString } from '@/utils/errorObjectToString';
import router from '@/router';

const authStore = useAuthStore();

const form = reactive({
    username: '',
    email: '',
    password: '',
    address: '',
    phone: ''
});

const rules = {
    username: { required, minLength: minLength(3), maxLength: maxLength(100), alpha },
    email: { required, email, maxLength: maxLength(255) },
    password: { required, minLength: minLength(8) },
    address: {maxLength: maxLength(100)},
    phone: {numeric}
};

const v$ = useVuelidate(rules, form);

const usernameError = computed(() => {
    if (!v$.value.username.$dirty) return ''  
    if (v$.value.username.required.$invalid) return 'El nombre es obligatorio'
    if (v$.value.username.minLength.$invalid) return 'El nombre debe tener al menos 3 caracteres'
    if (v$.value.username.maxLength.$invalid) return 'El nombre no puede exceder los 100 caracteres'
    if (v$.value.username.alpha.$invalid) return 'El nombre solo puede contener letras'
    return ''
})

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

const addressError = computed(() => {
    if (!v$.value.address.$dirty) return ''
    if (v$.value.address.maxLength.$invalid) return 'La dirección no puede exceder los 100 caracteres'
    return ''
})

const phoneError = computed(() => {
    if (!v$.value.phone.$dirty) return ''
    if (v$.value.phone.numeric.$invalid) return 'El número de teléfono solo puede contener números'
    return ''
})

const registerSuccess = ref(false);

const modal = reactive({
    title: 'Registrando usuario',
    description: 'Por favor, espera mientras registramos tu cuenta.',
    type: 'waiting',
    visibility: false
});

const handleSubmit = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;
    try{
        modal.visibility = true;
        await authStore.registerUser(form);
        modal.title = 'Registro exitoso';
        modal.description = 'Tu cuenta ha sido creada correctamente.';
        modal.type = 'success';
        registerSuccess.value = true;
    }catch(error){
        modal.title = error.response.data.message;
        modal.description = errorObjectToString(error.response.data.errors);
        modal.type = 'error';
    }finally{
        setTimeout(() => {
            modal.visibility = false;
            if(registerSuccess.value) router.push({ name: 'home' });
        }, 2000);
    }
};
</script>