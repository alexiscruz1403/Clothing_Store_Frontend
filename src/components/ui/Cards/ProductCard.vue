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
        <div class="absolute top-2 right-2 cursor-pointer z-10">
            <Heart :fill="heartFill" @click="handleFavoriteClick"/>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed } from 'vue';
import { useFavoritesStore } from '@/stores/useFavoritesStore';

const favoritesStore = useFavoritesStore();

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

const product = computed(() => {
    return {
        product_id: props.product_id,
        product_name: props.product_name,
        product_image: props.product_image,
        product_brand: props.product_brand,
        product_price: props.product_price,
        product_description: props.product_description,
        product_is_in_cart: props.product_is_in_cart,
        product_is_in_favorites: props.product_is_in_favorites
    }
});

const handleFavoriteClick = () => {
    if (props.product_is_in_favorites) {
        favoritesStore.removeFromFavorites(product.value);
    } else {
        favoritesStore.addToFavorites(product.value);
    }
}

</script>