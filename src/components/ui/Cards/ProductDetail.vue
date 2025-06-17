<template>
    <div class="flex flex-col md:flex-row gap-4 w-full max-w-screen">
        <div class="bg-white p-2 md:p-4 flex flex-col items-center md:flex-row gap-4 rounded-lg">
            <div class="flex md:flex-col order-2 md:order-1">
                <img v-for="image in imageGallery" :key="image.image_id" :src="image.image_path" :alt="image.image_path" :class="['size-24 lg:size-32 cursor-pointer rounded-md hover:opacity-80 transition-opacity duration-300', selectedImage.image_id === image.image_id ? 'border-2 border-black' : '']" @click="handleImageClick(image)"> 
            </div>
            <img :src="selectedImage.image_path" :alt="props.product_description" class="size-44 lg:size-96 order-1 md:order-2">
        </div>
        <div class="bg-white p-4 flex flex-col divide-y divide-gray-200 rounded-lg">
            <div class="flex flex-col gap-4 py-4">
                <div class="flex flex-col">
                    <h2 class="text-xl font-bold">{{ props.product_name }}</h2>
                    <p class="text-sm text-[#4F4F4F]">{{ props.product_brand }}</p>
                    <p>{{ props.product_description }}</p>
                </div>
                <p class="text-xl font-bold">${{ props.product_price }}</p>
            </div>
            <div class="py-4">
                <div class="flex gap-1">
                    <button v-for="size in props.product_sizes" :class="['py-3 px-6 border rounded-md', selectedSize.size === size.size ? 'text-white bg-black' : '', size.stock != 0 ? 'cursor-pointer border-black' : 'cursor-not-allowed bg-gray-200 border-gray-200' ]" @click="handleSizeClick(size)" :key="size.size">
                        {{ size.size }}
                    </button>
                </div>
            </div>
            <div class="py-4 flex flex-col gap-4">
                <div class="flex flex-col gap-1">
                    <div class="flex gap-2">
                        <Counter v-model="quantity" :onChangeQuantity="updateQuantity" :max="maxQuantity" :min="1"/>
                        <button class="border border-black w-48 rounded-md flex justify-center items-center gap-1 cursor-pointer hover:bg-black hover:text-white transition-colors duration-300" @click="handleFavoriteClick">
                            <Heart size="16" fill="black" v-if="props.product_is_in_favorites"/>
                            <Heart size="16" v-else/>
                            <span>{{ favoriteText }}</span>
                        </button>
                    </div>
                    <p class="text-sm text-[#4F4F4F]">Stock: {{ selectedSize.stock }}</p>
                </div>
                <Button type="primary" label="Agregar al carrito" />
            </div>
        </div>
    </div>
</template>
<script setup>

import { Heart } from 'lucide-vue-next';
import Counter from '../Inputs/Counter.vue';
import Button from '../Buttons/Button.vue';
import { ref, computed, watch } from 'vue';
import { useDetailStore } from '@/stores/useDetailStore';

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

const favoriteText = computed(() => {
    return props.product_is_in_favorites ? 'Quitar de favoritos' : 'Agregar a favoritos';
});

const imageGallery = computed(() => {
    const main_image = props.product_images.find(image => image.is_main);
    const images = props.product_images.filter(image => !image.is_main);
    return [main_image, ...images];
});

const selectedImage = ref(imageGallery.value[0]);

const selectedSize = ref(props.product_sizes.find(size => size.stock > 0) || { size: '', stock: 0 });

const quantity = ref(1);

const maxQuantity = computed(() => {
    const size = selectedSize.value;
    return size.stock > 0 ? size.stock : 0;
});

watch([selectedSize], () => {
    quantity.value = 1; 
})

const updateQuantity = (newQuantity) => {
    quantity.value = newQuantity;
};

const handleSizeClick = (size) => {
    if(size.stock === 0) {
        return; 
    }
    selectedSize.value = size;
};

const handleFavoriteClick = () => {
    detailStore.changeProductFavoriteState();
}

const handleImageClick = (image) => {
    selectedImage.value = image;
}

</script>