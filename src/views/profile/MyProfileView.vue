<template>
    <LoadingView v-if="!displayContent" />
    <div class="flex flex-col items-center gap-4 w-screen max-w-3xl px-4" v-else>
        <div class="w-full flex justify-between">
            <Heading
                label="Mi perfil"
                level="1"
            />
            <Linker label="Volver al inicio" @click="handleLinkerClick"/>
        </div>
        <PanelMessage
            v-if="displayPanelMessage" 
            :status="responseStatus"
            :message="responseMessage" 
        />
        <div class="w-full">
            <form class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-4" @submit.prevent="handleProfileSubmit">
                <div class="flex flex-col gap-2 w-full">
                    <Heading
                        label="Información personal"
                        level="2"
                    />
                    <div class="flex flex-col gap-2">
                        <Input 
                            label="Nombre" 
                            :required="true" 
                            :modifiable="false" 
                            v-model="profileInfo.username"
                            @input-change="handleInputChange('username')"
                        />
                        <Input 
                            label="Correo electrónico" 
                            :required="true" 
                            :modifiable="false" 
                            v-model="profileInfo.email"
                            @input-change="handleInputChange('email')"
                        />
                        <Input 
                            label="Teléfono" 
                            type="tel" 
                            v-model="profileInfo.phone_number"
                            @input-change="handleInputChange('phone_number')"
                        />
                    </div>
                </div>
                <div class="flex flex-col gap-2 w-full">
                    <Heading
                        label="Dirección de envío"
                        level="2"
                    />
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2">
                            <Input 
                                label="Dirección" 
                                :error="profileErrors.address_line" 
                                v-model="profileInfo.address_line"
                                @input-change="handleInputChange('address_line')"
                            />
                            <Input 
                                label="Número" 
                                :error="profileErrors.house_number" 
                                v-model="profileInfo.house_number"
                                @input-change="handleInputChange('house_number')"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <Input 
                                label="Provincia" 
                                :error="profileErrors.state" 
                                v-model="profileInfo.state"
                                @input-change="handleInputChange('state')"
                            />
                            <Input 
                                label="Ciudad" 
                                :error="profileErrors.city" 
                                v-model="profileInfo.city" 
                                @input-change="handleInputChange('city')"
                            />
                            <Input 
                                label="Código Postal"
                                type="number" 
                                :error="profileErrors.postal_code" 
                                v-model="profileInfo.postal_code"
                                @input-change="handleInputChange('postal_code')"
                            />
                        </div>
                    </div>
                </div>
                <Button 
                    color="confirm" 
                    label="Guardar cambios" 
                    type="submit"
                >
                    <template v-slot:left-icon>
                        <Save size="16"/>
                    </template>
                </Button>
            </form>
        </div>
        <div class="w-full">
            <form class="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center gap-4" @submit.prevent="handlePasswordSubmit">
                <div class="flex flex-col gap-2 w-full">
                    <Heading
                        label="Cambiar contraseña"
                        level="2"
                    />
                    <div class="flex flex-col gap-2">
                        <Input 
                            label="Contraseña actual" 
                            type="password" 
                            placeholder="Ingrese su contraseña actual"
                            :error="passwordErrors.current_password" 
                            v-model="passwordInfo.current_password"
                            @input-change="handleInputChange('current_password')"
                        />
                        <Input 
                            label="Nueva contraseña" 
                            type="password" 
                            placeholder="Ingrese su nueva contraseña"
                            :error="passwordErrors.new_password" 
                            v-model="passwordInfo.new_password"
                            @input-change="handleInputChange('new_password')"
                        />
                        <Input 
                            label="Confirmar nueva contraseña" 
                            type="password" 
                            placeholder="Confirme su nueva contraseña"
                            :error="passwordErrors.confirm_password" 
                            v-model="passwordInfo.confirm_password"
                            @input-change="handleInputChange('confirm_password')"
                        />
                    </div>
                </div>
                <Button 
                    color="primary" 
                    label="Cambiar contraseña" 
                    type="submit"
                >
                    <template v-slot:left-icon>
                        <RefreshCcw size="16"/>
                    </template>
                </Button>
            </form>
        </div>
    </div>
    <LoaderModal v-if="isLoading" content="Por favor espere mientras modificamos su información"/>
</template>
<script setup>

import Heading from '@/components/ui/Text/Heading.vue';
import Linker from '@/components/ui/Buttons/Linker.vue';
import { Save, RefreshCcw } from 'lucide-vue-next';
import LoadingView from '@/components/ui/View/LoadingView.vue';
import LoaderModal from '@/components/ui/Modals/LoaderModal.vue';
import PanelMessage from '@/components/ui/Panel/PanelMessage.vue';
import Input from '@/components/ui/Inputs/Input.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import { ref, reactive, onMounted, h } from 'vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from '@vuelidate/validators'
import router from '@/router';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const isLoading = ref(false);
const displayContent = ref(false);
const displayPanelMessage = ref(false);
const responseStatus = ref('');
const responseMessage = ref('');

const profileInfo = reactive({});
const passwordInfo = reactive({
    current_password: '',
    new_password: '',
    confirm_password: ''
});

const profileRules = {
    phone_number: { numeric },
    address_line: { maxLength: maxLength(255) },
    house_number: { maxLength: maxLength(255) },
    state: { maxLength: maxLength(255) },
    city: { maxLength: maxLength(255) },
    postal_code: { numeric }
};
const passwordRules = {
    current_password: { required, minLength: minLength(8) },
    new_password: { required, minLength: minLength(8) },
    confirm_password: { required, minLength: minLength(8) }
};

const profileErrors = reactive({});
const passwordErrors = reactive({});

const profile$ = useVuelidate(profileRules, profileInfo);
const password$ = useVuelidate(passwordRules, passwordInfo);

const handleScroll = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

const handleTimeout = (withRedirect = false) => {
    setTimeout(() => {
        responseStatus.value = '';
        responseMessage.value = '';
        displayPanelMessage.value = false;
        if (withRedirect) {
            router.push({ name: 'login' });
        }
    }, 3000);
}

const handleProfileSubmit = async () => {
    isLoading.value = true;

    profile$.value.$touch();
    if(profile$.value.$invalid) handleProfileErrors();
    if(!profile$.value.$invalid){
        try{
            await authStore.updateInfo(profileInfo);
            responseStatus.value = 'success';
            responseMessage.value = 'Información de perfil actualizada correctamente';
            handleScroll();
            displayPanelMessage.value = true;
        }catch(error){
            responseStatus.value = 'error';
            responseMessage.value = `Error al actualizar la información del perfil: ${error.response.data.errors}`;
            handleScroll();
            displayPanelMessage.value = true;
        }finally{
            isLoading.value = false;
            handleTimeout();
        }
    }
}

const handlePasswordSubmit = async () => {
    isLoading.value = true;

    password$.value.$touch();
    if (password$.value.$invalid) handlePasswordErrors();
    if (!password$.value.$invalid) {
        try{
            await authStore.updatePassword(passwordInfo);
            responseStatus.value = 'success';
            responseMessage.value = 'Contraseña actualizada correctamente. Deberá volver a iniciar sesión.';
            handleScroll();
            displayPanelMessage.value = true;
            handleTimeout(true);
        }catch(error){
            responseStatus.value = 'error';
            responseMessage.value = `Error al actualizar la contraseña: ${error.response.data.errors}`;
            handleScroll();
            displayPanelMessage.value = true;
        }finally{
            isLoading.value = false;
            handleTimeout();
        }
    }
}

const handleProfileErrors = () => {
    profileErrors.address_line = '';
    profileErrors.house_number = '';
    profileErrors.state = '';
    profileErrors.city = '';
    profileErrors.postal_code = '';

    if (profile$.value.address_line.maxLength.$invalid) profileErrors.address_line = 'La dirección no puede tener más de 5 caracteres';
    if (profile$.value.house_number.maxLength.$invalid) profileErrors.house_number = 'El número de la casa no puede tener más de 255 caracteres';
    if (profile$.value.state.maxLength.$invalid) profileErrors.state = 'El estado no puede tener más de 255 caracteres';
    if (profile$.value.city.maxLength.$invalid) profileErrors.city = 'La ciudad no puede tener más de 255 caracteres';
    if (profile$.value.postal_code.numeric.$invalid) profileErrors.postal_code = 'El código postal debe ser numérico';
}

const handlePasswordErrors = () => {
    passwordErrors.current_password = '';
    passwordErrors.new_password = '';
    passwordErrors.confirm_password = '';

    if(password$.value.current_password.required.$invalid) passwordErrors.current_password = 'La contraseña actual es obligatoria';
    if(password$.value.current_password.minLength.$invalid) passwordErrors.current_password = 'La contraseña actual debe tener al menos 8 caracteres';
    if(password$.value.new_password.required.$invalid) passwordErrors.new_password = 'La nueva contraseña es obligatoria';
    if(password$.value.new_password.minLength.$invalid) passwordErrors.new_password = 'La nueva contraseña debe tener al menos 8 caracteres';
    if(password$.value.confirm_password.required.$invalid) passwordErrors.confirm_password = 'La confirmación de la contraseña es obligatoria';
    if(password$.value.confirm_password.minLength.$invalid) passwordErrors.confirm_password = 'La confirmación de la contraseña debe tener al menos 8 caracteres';
    if(passwordInfo.confirm_password !== passwordInfo.new_password) passwordErrors.confirm_password = 'Las contraseñas no coinciden';
}

const handleInputChange = (field) => {
    const isProfileField = profileInfo[field];
    if(isProfileField) {
        if(!profileErrors[field]) return;
        profile$.value.$touch();
        if (profile$.value.$invalid) {
            handleProfileErrors();
        } else {
            delete profileErrors[field];
        }
    }else{
        if(!passwordErrors[field]) return;
        password$.value.$touch();
        if (password$.value.$invalid) {
            handlePasswordErrors();
        } else {
            delete passwordErrors[field];
        }
    }
}

const handleLinkerClick = () => {
    router.push({ name: 'home' });
};

onMounted(async () => {
    try{
        await authStore.validateSession();
        profileInfo.username = user.value.username;
        profileInfo.email = user.value.email;
        profileInfo.phone_number = user.value.phone_number;
        profileInfo.address_line = user.value.address ? user.value.address.address_line : '';
        profileInfo.house_number = user.value.address ? user.value.address.house_number : '';
        profileInfo.state = user.value.address ? user.value.address.state : '';
        profileInfo.city = user.value.address ? user.value.address.city : '';
        profileInfo.postal_code = user.value.address ? user.value.address.postal_code : '';
        displayContent.value = true;
    }catch(error){
        console.error(error);
    }
});

</script>