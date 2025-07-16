<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-between pb-5">
            <h2 :class="subtitleClass">Productos</h2>
            <p :class="foundProductsClass">{{ matchesText }}</p>
        </div>
        <div class="flex flex-col gap-5">
            <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                <ProductCard v-for="product in products"
                    :key="product.product_id"
                    :product_id=product.product_id
                    :product_images="product.images"
                    :product_name="product.product_name"
                    :product_brand="product.product_brand"
                    :product_description="product.product_description"
                    :product_price="product.product_price"
                    :is_in_cart="product.is_in_cart"
                    :is_in_favorites="product.is_in_favorites" 
                />
            </div>
            <div class="flex justify-center items-center">
                <Button
                    v-if="props.availableProducts" 
                    :type="buttonType" 
                    label="Cargar más"
                    @click="handleFetchProducts" 
                />  
            </div>          
        </div>
        <div v-if="showEmptyMessage" class="w-full h-20 lg:h-full flex justify-center items-center">
            <p class="text-lg text-center bg-gray-400 text-transparent" v-if="loading">{{ props.emptyMessage }}</p>
            <p class="text-lg text-center" v-else>{{ props.emptyMessage }}</p>
        </div>
    </div>
</template>
<script setup>

import ProductCard from '../Cards/ProductCard.vue';
import Button from '../Buttons/Button.vue';
import { computed, defineEmits, inject } from 'vue';
import { bgLoadingCLass } from '@/consts/loadingClasses';

const props = defineProps({
    products: {
        type: Array,
        required: true
    },
    emptyMessage: {
        type: String,
        default: 'No hay productos disponibles'
    },
    matches: {
        type: Number,
        default: 0
    },
    availableProducts: {
        type: Boolean,
        default: false
    }
})

const loading = inject('loading');

const emit = defineEmits(['fetch-products']);

const subtitleClass = computed(() => {
    const baseClass = 'text-xl';
    if(loading.value && props.products.length == 0) return `${baseClass} ${bgLoadingCLass}`;
    return baseClass;
});

const foundProductsClass = computed(() => {
    if (loading.value && props.products.length == 0) return `${bgLoadingCLass}`;
    return 'text-[#4F4F4F]';
});

const showEmptyMessage = computed(() => {
    return props.products.length === 0 && !loading.value;
});

const matchesText = computed(() => {
    return `${props.matches} productos encontrados`;
})

const buttonType = computed(() => {
    return loading.value ? 'loading' : 'secondary';
});

const products = computed(() => {
    if(loading.value) {
        const loadingProducts = Array.from({ length: 10 }, (_, index) => ({
            product_id: 0,
            images: [],
            product_name: 'Cargando nombre',
            product_brand: 'Cargando marca',
            product_description: 'Cargando descripcion',
            product_price: 0.0,
            is_in_cart: false,
            is_in_favorites: false
        }));

        const currentProducts = props.products;

        return [...currentProducts, ...loadingProducts];
    }
    return props.products;
});

const handleFetchProducts = () => {
    emit('fetch-products');
};

</script>