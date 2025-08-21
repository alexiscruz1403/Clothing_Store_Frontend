<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-between pb-5">
            <Heading 
                label="Productos" 
                :level="2"
            />
            <Text 
                :label="matchesText" 
                :level="3"
            />
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
                    :color="buttonColor" 
                    label="Cargar más"
                    @click="handleFetchProducts" 
                />  
            </div>          
        </div>
        <div v-if="showEmptyMessage" class="w-full h-20 lg:h-full flex justify-center items-center">
            <Text 
                v-if="loading"
                :label="props.emptyMessage"
                :level="3"
                size="lg"
                class="text-transparent"
            />
            <Text 
                v-else
                :label="props.emptyMessage"
                :level="3"
                size="lg"
                class="text-center"
            />
        </div>
    </div>
</template>
<script setup>

import Heading from '../Text/Heading.vue';
import Text from '../Text/Text.vue';
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

const showEmptyMessage = computed(() => {
    return props.products.length === 0 && !loading.value;
});

const matchesText = computed(() => {
    return `${props.matches} productos encontrados`;
})

const buttonColor = computed(() => {
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