<template>
    <div class="bg-white py-2 lg:py-4 flex items-center gap-5 w-full md:w-sm lg:w-xl">
        <img :src="props.product_image" alt="Product Image" class="size-20 md:size-28 lg:size-32 object-cover">
        <div class="flex flex-col gap-4 w-full">
            <div class="flex justify-between w-full">
                <div class="flex flex-col">
                    <p class="lg:text-lg">{{ props.product_name }}</p>
                    <p class="text-sm">{{ props.product_brand }}</p>
                    <p class="text-sm">Talle {{ props.product_size }}</p>
                </div>
                <p class="font-bold">${{ totalPrice }}</p>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex justify-between items-center">
                    <Counter v-model="props.product_quantity" :min="1" :max="props.product_stock" :onChangeQuantity="changeQuantity"/>
                    <Trash2 class="cursor-pointer" @click="onDeleteCartItem()"/>
                </div>
                <div>
                    <p class="text-xs text-gray-500">Stock: {{ props.product_stock }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { computed } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import  Counter  from '@/components/ui/Inputs/Counter.vue';
import { useCartStore } from '@/stores/useCartStore';

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
    product_size: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_stock: {
        type: Number,
        required: true
    }
});

const totalPrice = computed(() => {
    return (props.product_price * props.product_quantity).toFixed(2);
});

const cartStore = useCartStore();

const changeQuantity = (newQuantity) => {
    cartStore.changeProductQuantity(props.product_id, newQuantity);
}

const onDeleteCartItem = () => {
    cartStore.removeProductFromCart(props.product_id);
}

</script>