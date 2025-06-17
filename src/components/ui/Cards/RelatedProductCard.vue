<template>
    <div class="bg-white p-2 lg:p-4 rounded-md relative w-max">
        <div class="flex justify-center items-center cursor-pointer" @click="handleCardClick">
            <img :src="props.product_image" :alt="props.product_description" class="size-24 lg:size-40">
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <p class="">{{ props.product_name }}</p>
                <p class="text-[#4F4F4F] text-sm">{{ props.product_brand }}</p>
            </div>
            <p>${{ props.product_price }}</p>
            <Button type="primary" label="Agregar al carrito" :onClick="handleCartClick"/>
        </div>
    </div>
</template>
<script setup>

import Button from '../Buttons/Button.vue';
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
    product_price: {
        type: Number,
        required: true
    },
});

const handleCardClick = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
};

const handleCartClick = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
}

</script>