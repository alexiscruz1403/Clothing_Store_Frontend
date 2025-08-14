<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="bg-white p-8 flex flex-col items-center justify-center rounded-lg max-w-xl divide-y divide-gray-300">
        <div class="flex flex-col items-center gap-2 pb-4">
            <div class="bg-[#E9E2D0] p-4 rounded-full">
                <Check size="34" />
            </div>
            <div class="flex flex-col items-center gap-1">
                <h1 class="font-bold text-2xl">¡Pago exitoso!</h1>
                <p>Tu pedido ha sido procesado correctamente.</p>
            </div>
        </div>
        <div class="flex flex-col gap-3 pt-4">
            <div>
                <h2 class="font-semibold text-xl">Gracias por su compra</h2>
                <p>Apreciamos tu confianza en nuestra tienda. Tu pedido está siendo procesado y pronto estará en camino.</p>
            </div>
            <div>
                <h2 class="font-semibold text-xl">Confirmación por correo electrónico</h2>
                <p>Hemos enviado un ticket de compra a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada (y la carpeta de spam por si acaso).</p>
            </div>
            <div>
                <h2 class="font-semibold text-xl">Seguimiento</h2>
                <p>Puedes hacer seguimiento de tu pedido utilizando el siguiente número de orden:</p>
                <p class="font-bold">{{ orderId }}</p>
            </div>
            <div>
                <h2 class="font-semibold text-xl">¿Qué sigue?</h2>
                <ul class="list-disc list-inside">
                    <li>Recibirás actualizaciones sobre el estado de tu pedido por correo electrónico.</li>
                    <li>Puedes hacer seguimiento de tu pedido en tu cuenta de usuario.</li>
                    <li>Si tienes alguna pregunta, no dudes en contactar a nuestro servicio al cliente.</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>

import LoadingView from '@/components/ui/View/LoadingView.vue';
import { Check } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/usePaymentStore';
import router from '@/router';

const paymentStore = usePaymentStore();

const orderId = ref(0);

const displayContent = ref(false);

onMounted(async () => {
    try{
        const response = await paymentStore.getPaymentOrderNumber();
        orderId.value = response;
        displayContent.value = true;
    }catch(error){
        router.push({ name: 'home' });
    }
});
</script>