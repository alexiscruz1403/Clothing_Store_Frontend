<template>
    <div class="bg-white p-4 rounded-md relative">
        <div class="flex justify-center items-center">
            <img :src="props.product_image" :alt="props.product_description" class="size-40">
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <p class="">{{ props.product_name }}</p>
                <p class="text-[#4F4F4F] text-sm">{{ props.product_brand }}</p>
            </div>
            <p>${{ props.product_price }}</p>
            <Button type="primary" label="Agregar al carrito"/>
        </div>
        <div class="absolute top-2 right-2 cursor-pointer">
            <Heart :fill="heartFill"/>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed } from 'vue';

const props = defineProps({
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
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_is_in_cart: {
        type: Boolean,
        required: true
    },
    product_is_in_favorites: {
        type: Boolean,
        required: true
    }
});

const heartFill = computed(() => {
    return props.product_is_in_favorites ? "black" : "white"
});

</script>