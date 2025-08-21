<template>
    <div :class="cardClass">
        <div class="flex justify-center items-center cursor-pointer" @click="handleCardClick">
            <div v-if="loading" :class="imgClass"></div>
            <img v-else :src="props.product_image" :alt="props.product_description" :class="imgClass">
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <Text 
                    :label="props.product_name" 
                    :class="loadingTextClass" 
                />
                <Text 
                    :label="props.product_brand"
                    :level="2"
                    size="sm" 
                    :class="loadingTextClass" 
                />
            </div>
            <Text 
                :label="`$${props.product_price}`" 
                :class="loadingTextClass" 
            />
            <Button 
                :color="buttonColor"
                label="Agregar al carrito" 
                size="large"
                :onClick="handleCartClick"
            >
                <template v-slot:left-icon>
                    <ShoppingCart size="16" />
                </template>
            </Button>
        </div>
    </div>
</template>
<script setup>

import { ShoppingCart } from 'lucide-vue-next';
import Text from '../Text/Text.vue';
import Button from '../Buttons/Button.vue';
import { computed, inject } from 'vue';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';
import router from '@/router';

const props = defineProps({
    product_id: {
        type: Number,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_brand: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
});

const loading = inject('loading');

const cardClass = computed(() => {
    const baseClass = "p-2 lg:p-4 rounded-md relative w-max";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} bg-white`;
});

const imgClass = computed(() => {
    const baseClass = "size-24 lg:size-40";
    return loading.value ? `${baseClass} ${textLoadingClass}` : baseClass;
});

const loadingTextClass = computed(() => {
    return loading.value ? textLoadingClass : '';
});

const buttonColor = computed(() => {
    return loading.value ? 'loading' : 'primary';
});

const handleCardClick = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
};

const handleCartClick = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
}

</script>