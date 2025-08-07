<template>
    <div class="flex flex-col gap-2">
        <div :class="computedClass">
            <div v-for="(image, index) in imagesUrl" :key="index">
                <div class="relative">
                    <img :src="image" class="size-40 object-contain rounded-md" />
                    <CircleX :size="20" color="red" :stroke-width="1"  fill="white" class="cursor-pointer absolute top-2 right-2" @click="handleDeleteClick(index, image)" />   
                </div>             
            </div>
        </div>
        <input type="file" :multiple="props.multiple" accept="image/*" class="hidden" ref="fileInput" @change="handleFileChange"/>
        <Button type="primary" :label="buttonLabel" @click="handleInputClick" :disabled="!props.modifiable"/>
    </div>
</template>
<script setup>

import Button from '../Buttons/Button.vue';
import { ref, computed, defineEmits } from 'vue';
import { getImgSrc } from '@/utils/getImgSrc';
import { CircleX } from 'lucide-vue-next';

const props = defineProps({
    images: {
        type: Array,
        default: 'Imagen'
    },
    multiple: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    modifiable: {
        type: Boolean,
        default: true
    },
    error: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['image-uploaded', 'delete-image']);

const imagesUrl = ref(props.images.map(image => getImgSrc(image.image_url)));

const fileInput = ref(null);

const uploadedFiles = ref([]);

const computedClass = computed(() => {
    const baseClass = 'grid gap-2';
    if(imagesUrl.value.filter(image => image.display).length > 1){
        return `${baseClass} grid-cols-2`;
    }else{
        return `${baseClass} grid-cols-1`;
    }
});

const buttonLabel = computed(() => {
    return props.multiple ? 'Subir Imágenes' : 'Subir Imágen';
});

const handleInputClick = () => {
    if(!props.modifiable) return; 

    fileInput.value.click();
};

const handleFileChange = (event) => {
    const files = event.target.files;
    if(files.length > 0){
        const fileUrls = Array.from(files).map(file => URL.createObjectURL(file));
        imagesUrl.value = [
            ...imagesUrl.value, 
            ...fileUrls
        ];
        uploadedFiles.value = Array.from(files).map(file => ({
            file: file,
            is_primary: props.multiple ? false : true
        }));
        emit('image-uploaded', uploadedFiles.value);
    }
};

const handleDeleteClick = (index, url) => {
    if(!props.modifiable) return;
    
    if(index > props.images.length - 1){
        URL.revokeObjectURL(url);
        uploadedFiles.value.splice(index - props.images.length, 1);

        emit('image-uploaded', uploadedFiles.value);
    }else{
        const deletedImage = props.images.filter(image => image.image_url === url.replace('http://127.0.0.1:8000',''))[0];
        imagesUrl.value.splice(index, 1);
        emit('delete-image', deletedImage);
    }
    
};

</script>