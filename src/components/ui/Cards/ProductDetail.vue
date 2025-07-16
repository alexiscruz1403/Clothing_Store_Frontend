<template>
    <div class="flex flex-col md:flex-row gap-4 w-full max-w-screen">
        <div :class="imageGalleryCardClass">
            <div class="flex md:flex-col order-2 md:order-1">
                <div :class="sideImagesClass" v-if="loading" v-for="image in imageGallery"></div>
                <img v-else v-for="image in imageGallery" :key="image.image_id" :src="getImgSrc(image.image_url)" :alt="image.image_path" :class="['size-24 lg:size-32 cursor-pointer rounded-md hover:opacity-80 transition-opacity duration-300', selectedImage.image_id === image.image_id ? 'border-2 border-black' : '']" @click="handleImageClick(image)"> 
            </div>
            <div :class="selectedImageClass" v-if="loading"></div>
            <img v-else :src="getImgSrc(selectedImage.image_url)" :alt="props.product_description" :class="selectedImageClass">
        </div>
        <div :class="productDetailCardClass">
            <div class="flex flex-col gap-4 py-4">
                <div class="flex flex-col gap-1">
                    <h2 :class="largeBoldTextClass">{{ props.product_name }}</h2>
                    <p :class="smallTextClass">{{ props.product_brand }}</p>
                    <p :class="normalTextClass">{{ props.product_description }}</p>
                </div>
                <p :class="largeBoldTextClass">${{ props.product_price }}</p>
            </div>
            <div class="py-4">
                <div class="flex gap-1">
                    <button v-for="size in props.product_sizes" :class="getSizeButtonsClass(size)" @click="handleSizeClick(size)" :key="size.size">
                        {{ size.product_size }}
                    </button>
                </div>
            </div>
            <div class="py-4 flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <div class="flex gap-2">
                        <Counter v-model="quantity" @quantity-changed="updateQuantity" :max="maxQuantity" :min="1"/>
                        <button :class="favoriteButtonClass" @click="handleFavoriteClick">
                            <Heart size="16" fill="black" v-if="props.product_is_in_favorites"/>
                            <Heart size="16" v-else/>
                            <span>{{ favoriteText }}</span>
                        </button>
                    </div>
                    <p :class="smallTextClass">Stock: {{ maxQuantity }}</p>
                </div>
                <Button :type="buttonType" label="Agregar al carrito" @click="handleCartClick"/>
            </div>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Counter from '../Inputs/Counter.vue';
import Button from '../Buttons/Button.vue';
import { ref, computed, watch, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/useAuthStore';
import { useDetailStore } from '@/stores/useDetailStore';
import { useCartStore } from '@/stores/useCartStore';
import { getImgSrc } from '@/utils/getImgSrc';
import { bgLoadingCLass, textLoadingClass } from '@/consts/loadingClasses';
import router from '@/router';

const props = defineProps({
    product_id: {
        type: Number,
        required: true
    },
    product_images: {
        type: Array,
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
    product_sizes: {
        type: Array,
        required: true
    },
    product_is_in_favorites: {
        type: Boolean,
        default: false
    }
});

const detailStore = useDetailStore();

const cartStore = useCartStore();

const authStore = useAuthStore();

const { isAuthenticated } = storeToRefs(authStore);

const loading = inject('loading');

const quantity = ref(1);

const selectedSize = ref(props.product_sizes[0]);

watch(selectedSize, () => {
    quantity.value = 1; 
})

const computedSelectedSize = computed(() => {
    return props.product_sizes.find(size => size.stock_quantity > 0);
});

watch(computedSelectedSize, (newSize) => {
    selectedSize.value = newSize;
}, { immediate: true });

const selectedImage = ref(props.product_images[0]);

const computedSelectedImage = computed(() => {
    return props.product_images.find(image => image.is_primary);
});

watch(computedSelectedImage, (newImage) => {
    selectedImage.value = newImage;
}, { immediate: true });

const favoriteText = computed(() => {
    return props.product_is_in_favorites ? 'Quitar de favoritos' : 'Agregar a favoritos';
});

const imageGallery = computed(() => {
    const main_image = props.product_images.find(image => image.is_primary);
    const images = props.product_images.filter(image => !image.is_primary);
    return [main_image, ...images];
});

const maxQuantity = computed(() => {
    if(loading.value) return 0;
    const size = selectedSize.value;
    return size.stock_quantity > 0 ? size.stock_quantity : 0;
});

const imageGalleryCardClass = computed(() => {
    const baseClass = "p-2 md:p-4 flex flex-col items-center md:flex-row gap-4 rounded-lg";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} bg-white`;
});

const sideImagesClass = computed(() => {
    const baseClass = "size-24 lg:size-32 rounded-md";
    return loading.value ? `${baseClass} ${textLoadingClass} mb-1` : baseClass;
});

const selectedImageClass = computed(() => {
    const baseClass = "size-44 lg:size-96 order-1 md:order-2";
    return loading.value ? `${baseClass} ${textLoadingClass}` : baseClass;
});

const productDetailCardClass = computed(() => {
    const baseClass = "p-4 flex flex-col rounded-lg";
    return loading.value ? `${baseClass} ${bgLoadingCLass}` : `${baseClass} bg-white divide-y divide-gray-200`;
});

const largeBoldTextClass = computed(() => {
    const baseClass = "text-xl font-bold";
    return loading.value ? `${baseClass} ${textLoadingClass} w-max` : baseClass;
});

const smallTextClass = computed(() => {
    const baseClass = "text-sm text-[#4F4F4F]";
    return loading.value ? `${baseClass} ${textLoadingClass} w-max` : baseClass;
});

const normalTextClass = computed(() => {
    return loading.value ? `${textLoadingClass}` : '';
});

const sizeButtonClass = computed(() => {
    const baseClass = "py-3 px-6 border rounded-md";
    return loading.value ? `${baseClass} ${textLoadingClass}` : baseClass;
});

const favoriteButtonClass = computed(() => {
    const baseClass = "w-48 rounded-md flex justify-center items-center gap-1";

    return loading.value ? `${baseClass} ${textLoadingClass}` : `${baseClass} border border-black cursor-pointer hover:bg-black hover:text-white transition-colors duration-300`
});

const buttonType = computed(() => {
    return loading.value ? 'loading' : 'primary';
});

const getSizeButtonsClass = (size) => {
    if(loading.value) return `${sizeButtonClass.value}`;

    const isSelectedClass = selectedSize.value.product_size === size.product_size ? 'text-white bg-black' : '';
    const stockClass = size.stock_quantity > 0 ? "cursor-pointer border-black" : "cursor-not-allowed bg-gray-200 border-gray-200";

    return `${sizeButtonClass.value} ${isSelectedClass} ${stockClass}`;
}

const updateQuantity = (newQuantity) => {
    if(loading.value) return;
    
    quantity.value = newQuantity;
};

const handleSizeClick = (size) => {
    if(size.stock_quantity === 0 || loading.value) return;

    selectedSize.value = size;
};

const handleFavoriteClick = () => {
    if(loading.value) return;

    detailStore.changeProductFavoriteState();
}

const handleImageClick = (image) => {
    selectedImage.value = image;
}

const handleCartClick = async () => {
    if(!isAuthenticated.value) {
        router.push({ name: 'login' });
        return;
    }

    try{
        await cartStore.addProduct(props.product_id, selectedSize.value.product_size, quantity.value);
        router.push({ name: 'cart' });
    }catch(error) {
        
    }
}

</script>