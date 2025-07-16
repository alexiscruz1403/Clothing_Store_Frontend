<template>
    <div :class="cardClass">
        <div v-if="loading" :class="imgClass"></div>
        <img v-else :src="imgSource" alt="Product Image" :class="imgClass">
        <div class="flex flex-col gap-4 w-full">
            <div class="flex justify-between w-full">
                <div class="flex flex-col gap-1">
                    <p :class="largeTextClass">{{ props.product_name }}</p>
                    <p :class="smallTextClass">{{ props.product_brand }}</p>
                    <p :class="smallTextClass">Talle {{ props.product_size }}</p>
                </div>
                <p :class="boldTextClass">${{ totalPrice }}</p>
            </div>
            <div class="flex flex-col gap-1">
                <div class="flex justify-between items-center">
                    <Counter v-model="props.product_quantity" :min="1" :max="props.product_stock" @quantity-changed="changeQuantity" :loading="loading"/>
                    <div @click="onDeleteCartItem">
                        <Trash2 class="cursor-pointer"/>
                    </div>
                </div>
                <div>
                    <p :class="stockClass">Stock: {{ props.product_stock }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { Trash2 } from 'lucide-vue-next';
import  Counter  from '@/components/ui/Inputs/Counter.vue';
import { ref, computed, inject } from 'vue';
import { useCartStore } from '@/stores/useCartStore';
import { getImgSrc } from '@/utils/getImgSrc';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';

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

const loading = inject('loading');

const totalPrice = computed(() => {
    return (props.product_price * props.product_quantity).toFixed(2);
});

const imgSource = computed(() => {
    return getImgSrc(props.product_image);
});

const cardClass = computed(() => {
    const baseClass = "py-2 lg:py-4 flex items-center gap-5 w-full md:w-sm lg:w-xl";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} bg-white`;
});

const imgClass = computed(() => {
    const baseClass = "size-20 md:size-28 lg:size-32 object-cover";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass}`;
});

const largeTextClass = computed(() => {
    const baseClass = "lg:text-lg";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass}`;;
});

const smallTextClass = computed(() => {
    const baseClass = "text-sm";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass}`;
});

const boldTextClass = computed(() => {
    const baseClass = "font-bold";
    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass}`;;
});

const stockClass = computed(() => {
    return loading.value ? `${textLoadingClass} w-max` : 'text-xs text-gray-500';
});

const cartStore = useCartStore();

const timeout = ref(null);

const changeQuantity = async (newQuantity) => {
    if(timeout.value) clearTimeout(timeout.value);
    cartStore.changeProductQuantity(props.product_id, props.product_size, newQuantity);

    timeout.value = setTimeout(async () => {
        await cartStore.updateCartItems(props.product_id, props.product_size, newQuantity);
    }, 750);
}

const onDeleteCartItem = async () => {
    await cartStore.removeProduct(props.product_id, props.product_size);
}

</script>