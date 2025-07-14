<template>
    <div :class="cardClass">
        <div class="flex justify-center items-center" @click="handleCartRedirection">
            <div :class="imgClass" v-if="props.loading"></div>
            <img :src="mainImageSrc" :alt="props.product_description" :class="imgClass" v-else>
        </div>
        <div class="flex flex-col gap-2">
            <div class="flex flex-col">
                <p :class="productNameClass">{{ props.product_name }}</p>
                <p :class="productBrandClass">{{ props.product_brand }}</p>
            </div>
            <p :class="productPriceClass">${{ props.product_price }}</p>
            <Button :type="buttonType" label="Agregar al carrito" @click="handleCartRedirection" size="large"/>
        </div>
        <div :class="heartClass">
            <Heart :fill="heartFill" @click="handleFavoriteClick"/>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import { computed } from 'vue';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';
import { useFavoritesStore } from '@/stores/useFavoritesStore';
import { getImgSrc } from '@/utils/getImgSrc';
import router from '@/router';

const favoritesStore = useFavoritesStore();

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
    },
    loading: {
        type: Boolean,
        default: false
    }
});

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
    if (props.loading) return `${bgLoadingCLass} ${baseClass}`;
    return `bg-white ${baseClass}`;
});

const imgClass = computed(() => {
    const baseClass = 'size-40';
    if (props.loading) return `${baseClass} ${textLoadingClass}`;
    return `${baseClass} cursor-pointer`;
});

const productNameClass = computed(() => {
    if (props.loading) return `${textLoadingClass}`;
    return '';
});

const productBrandClass = computed(() => {
    if (props.loading) return `${textLoadingClass}`;
    return 'text-[#4F4F4F] text-sm';
});

const productPriceClass = computed(() => {
    if (props.loading) return `${textLoadingClass}`;
    return '';
});

const heartClass = computed(() => {
    if(props.loading) return 'hidden';
    return 'absolute top-1 right-1 cursor-pointer z-10';
});

const buttonType = computed(() => {
    if(props.loading) return 'loading';
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

const handleCartRedirection = computed(() => {
    if (props.loading) return () => {};
    return redirectToCart;
});

const handleFavoriteClick = async () => {
    if(props.loading) return;

    await favoritesStore.toggleFavorite(product.value);
}

const redirectToCart = () => {
    router.push({ name: 'productDetail', params: { id: props.product_id } });
}

</script>