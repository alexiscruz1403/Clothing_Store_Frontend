<template>
    <div :class="cardClass">
        <div class="flex justify-center items-center" @click="redirectToDetail">
            <div :class="imgClass" v-if="loading"></div>
            <img :src="mainImageSrc" :alt="props.product_description" :class="imgClass" v-else>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <p :class="productNameClass">{{ props.product_name }}</p>
                <p :class="productBrandClass">{{ props.product_brand }}</p>
            </div>
            <p :class="productPriceClass">${{ props.product_price }}</p>
            <Button v-if="!props.is_in_cart" :type="buttonType" label="Agregar al carrito" @click="handleCartButtonClick" size="large"/>
            <Button v-else :type="buttonType" label="Ver en carrito" @click="handleCartButtonClick" size="large"/>
        </div>
        <div :class="heartClass">
            <Heart :fill="heartFill" @click="handleFavoriteClick"/>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';
import { getImgSrc } from '@/utils/getImgSrc';
import router from '@/router';

const props = defineProps({
    product_id: {
        type: Number,
        required: true,
    },
    product_images: {
        type: Array,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    product_brand: {
        type: String,
        required: true,
    },
    product_description: {
        type: String,
        required: true,
    },
    product_price: {
        type: Number,
        required: true,
    },
    is_in_favorites: {
        type: Boolean,
        required: true,
    },
    is_in_cart: {
        type: Boolean,
        required: true,
    }
});

const favoritesStore = useFavoritesStore();

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);

const loading = inject('loading');

const heartFill = computed(() => {
    return props.is_in_favorites ? "black" : "white"
});

const product = computed(() => {
    return {
        product_id: props.product_id,
        product_name: props.product_name,
        product_images: props.images,
        product_brand: props.product_brand,
        product_price: props.product_price,
        product_description: props.product_description,
        is_in_favorites: props.is_in_favorites,
        is_in_cart: props.is_in_cart
    }
});

const cardClass = computed(() => {
    const baseClass = 'p-4 rounded-md relative flex flex-col gap-2';
    if (loading.value) return `${bgLoadingCLass} ${baseClass}`;
    return `bg-white ${baseClass}`;
});

const imgClass = computed(() => {
    const baseClass = 'size-40';
    if (loading.value) return `${baseClass} ${textLoadingClass}`;
    return `${baseClass} cursor-pointer`;
});

const productNameClass = computed(() => {
    if (loading.value) return `${textLoadingClass}`;
    return '';
});

const productBrandClass = computed(() => {
    if (loading.value) return `${textLoadingClass}`;
    return 'text-[#4F4F4F] text-sm';
});

const productPriceClass = computed(() => {
    if (loading.value) return `${textLoadingClass}`;
    return '';
});

const heartClass = computed(() => {
    if(loading.value) return 'hidden';
    return 'absolute top-1 right-1 cursor-pointer z-10';
});

const buttonType = computed(() => {
    if(loading.value) return 'loading';
    
    if(props.is_in_cart) return 'secondary';

    return 'primary';
})

const mainImageSrc = computed(() => {
    if(props.product_images && props.product_images.length > 0){
        const mainImage = props.product_images.filter((img) => {
            if(img.is_primary === 1) return img;
        });

        return mainImage.length > 0 ? getImgSrc(mainImage[0].image_url) : '';
    }
});

const handleCartButtonClick = computed(() => {
    if (loading.value) return () => {};
    
    if(props.is_in_cart) return () => router.push({ name: 'cart' });

    return redirectToDetail;
});

const handleFavoriteClick = async () => {
    if(loading.value) return;

    if(!isAuthenticated.value){
        router.push({ name: 'login' });
        return;
    }

    await favoritesStore.toggleFavorite(product.value);
}

const redirectToDetail = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
}

</script>