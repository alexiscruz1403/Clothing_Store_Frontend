<template>
    <LoadingView v-if="!displayContent" />
    <div v-else class="flex flex-col gap-2">
        <div class="flex items-center gap-1 cursor-pointer">
            <Linker 
                label="Volver al inicio" 
                @click="handleLinkerClick"
            />
        </div>
        <div class="bg-white p-8 flex flex-col items-center justify-center rounded-lg max-w-xl divide-y divide-gray-300">
            <div class="flex flex-col items-center gap-2 pb-4">
                <div class="bg-[#E9E2D0] p-4 rounded-full">
                    <Check size="34" />
                </div>
                <div class="flex flex-col items-center gap-1">
                    <Heading
                        label="¡Pago exitoso!"
                        level="1"
                    />
                    <Text 
                        label="Tu pedido ha sido procesado correctamente."
                    />
                </div>
            </div>
            <div class="flex flex-col gap-3 pt-4">
                <div>
                    <Heading
                        label="Gracias por su compra"
                        level="2"
                    />
                    <Text 
                        label="Apreciamos tu confianza en nuestra tienda. Tu pedido está siendo procesado y pronto estará en camino."
                    />
                </div>
                <div>
                    <Heading
                        label="Confirmación por correo electrónico"
                        level="2"
                    />
                    <Text 
                        label="Hemos enviado un ticket de compra a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada (y la carpeta de spam por si acaso)."
                    />
                </div>
                <div>
                    <Heading
                        label="Seguimiento"
                        level="2"
                    />
                    <Text 
                        label="Puedes hacer seguimiento de tu pedido utilizando el siguiente número de orden:"
                    />
                    <Text 
                        label="{{ orderId }}"
                        bold="bold"
                    />
                </div>
                <div>
                    <Heading
                        label="¿Qué sigue?"
                        level="2"
                    />
                    <ul class="list-disc list-inside">
                        <li>Recibirás actualizaciones sobre el estado de tu pedido por correo electrónico.</li>
                        <li>Puedes hacer seguimiento de tu pedido en tu cuenta de usuario.</li>
                        <li>Si tienes alguna pregunta, no dudes en contactar a nuestro servicio al cliente.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { Check } from 'lucide-vue-next';
import LoadingView from '@/components/ui/View/LoadingView.vue';
import Linker from '@/components/ui/Buttons/Linker.vue';
import Heading from '@/components/ui/Text/Heading.vue';
import Text from '@/components/ui/Text/Text.vue';
import { ref, onMounted } from 'vue';
import { usePaymentStore } from '@/stores/usePaymentStore';
import router from '@/router';

const paymentStore = usePaymentStore();

const orderId = ref(0);

const displayContent = ref(false);

const handleLinkerClick = () => {
    router.push({ name: 'home' });
}

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