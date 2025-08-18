<template>
    <div class="bg-black/50 h-screen w-screen p-5 flex justify-center items-center fixed top-0 left-0">
        <form class="bg-white p-4 flex flex-col items-center gap-4 rounded-lg shadow-lg max-h-full min-w-min max-w-5xl overflow-y-auto" @submit.prevent="" enctype="multipart/form-data">
            <h1 class="text-xl text-center font-bold">{{ props.title }}</h1>
            <div :class="computedGroupsClass">
                <div v-for="groups in computedInputsGroups" :key="groups.title.label">
                    <h2 class="text-lg font-semibold mb-2">{{ groups.title.label }}</h2>
                    <div :class="getInputsClass(groups.commonInputs)">
                        <Input v-for="input in groups.commonInputs" 
                            :key="input.key" 
                            :label="input.label" 
                            :type="input.type"
                            :modifiable="input.modifiable" 
                            :required="input.required" 
                            :error="validationErrors[input.key]" 
                            @input-change="handleInputChange(input.key)"
                            v-model="computedInputs[input.key].value" 
                        />
                        <Textarea v-for="textarea in groups.longTextInputs" 
                            :key="textarea.key" 
                            :label="textarea.label" 
                            :error="validationErrors[textarea.key]" 
                            :modifiable="textarea.modifiable" 
                            @input-change="handleInputChange(textarea.key)"
                            v-model="computedInputs[textarea.key].value" 
                        />
                    </div>
                    <div class="grid grid-cols-1 gap-2">
                        <Select v-for="select in groups.selectInputs" 
                            :key="select.key" 
                            :label="select.label" 
                            :options="select.options" 
                            :required="true" 
                            :modifiable="select.modifiable" 
                            :error="validationErrors[select.key]"
                            @input-change="handleInputChange(select.key)"
                            v-model="computedInputs[select.key].value"
                        />
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div v-for="image in groups.imageInputs">
                            <h3>{{ image.label }} <span class="text-red-500" v-if="image.required">*</span></h3>
                            <Image 
                                :images="getFilteredImages(image.primary)" 
                                :multiple="image.multiple" 
                                :modifiable="image.modifiable" 
                                @image-uploaded="handleImageChanged"
                                @delete-image="handleDeleteImage"
                            />
                            <span v-if="displayImageError(image)" class="text-sm text-[#C0392B]">{{ validationErrors.images }}</span>
                        </div>
                    </div>
                    <div v-for="stockInput in groups.stockInputs" class="flex flex-col gap-2">
                        <div class="grid grid-cols-4 gap-3">
                            <Input v-for="stock in stocks" 
                                :key="stock.product_size" 
                                :label="stock.product_size" 
                                type="number" 
                                :modifiable="true" 
                                :display-delete="true" 
                                :required="true"
                                @delete-input="handleDeleteStock" 
                                v-model="stock.stock_quantity" 
                            />
                        </div>
                        <Button 
                            color="secondary" 
                            label="Agregar stock" 
                            @click="handleNewStock" 
                        >
                            <template v-slot:left-icon>
                                <Plus size="16" />
                            </template>
                        </Button>
                    </div>
                </div>
            </div>
            <div class="flex gap-2">
                <Button 
                    color="primary" 
                    :label="mainButtonLabel" 
                    @click="handleSubmit" 
                />
                <Button 
                    color="cancel" 
                    label="Cancelar" 
                    @click="handleClose" 
                />
            </div>
        </form>
    </div>
</template>
<script setup>

import { Plus } from 'lucide-vue-next';
import Button from '../Buttons/Button.vue';
import Input from '../Inputs/Input.vue';
import Textarea from '../Inputs/Textarea.vue';
import Select from '../Inputs/Select.vue';
import Image from '../Inputs/Image.vue';
import { ref, computed, defineEmits, inject, watch } from 'vue';
import { validate } from '@/utils/validateAdminForm';

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    inputs: {
        type: Array,
    },
    data: {
        type: Object,
    },
    type: {
        type: String,
        default: 'update'
    },
    model: {
        type: String,
        default: 'orders'
    }
});

const emit = defineEmits(['close', 'deleteNewData', 'addStock', 'deleteStock', 'createItem', 'updateItem', 'deleteItem']);

const createModal = inject('createModal');
const createConfirmModal = inject('createConfirmModal');
const newData = inject('newData');

const computedGroupsClass = computed(() => {
    const baseClass = 'grid gap-8';
    return props.inputs.length > 1 ? `${baseClass} grid-cols-2` : `${baseClass} grid-cols-1`;
});

const mainButtonLabel = computed(() => {
    switch (props.type) {
        case 'update':
            return 'Actualizar';
        case 'create': case 'stock':
            return 'Agregar';
        default:
            return 'Acción';
    }
});

const computedInputsGroups = computed(() => {
    return props.inputs.map((inputsGroup) => {
        const title = inputsGroup.find(input => input.type === 'title');
        const commonInputs = inputsGroup.filter(input => input.type === 'text' || input.type === 'number' || input.type === 'password');
        const longTextInputs = inputsGroup.filter(input => input.type === 'textarea');
        const selectInputs = inputsGroup.filter(input => input.type === 'select');
        const imageInputs = inputsGroup.filter(input => input.type === 'image');
        const stockInputs = inputsGroup.filter(input => input.type === 'stock');

        return{
            title,
            commonInputs,
            longTextInputs,
            selectInputs,
            imageInputs,
            stockInputs
        };
    });
});

const computedInputs = computed(() => {
    const inputs = {};
    props.inputs.forEach((group) => {
        group.forEach((input) => {
            if(input.type === 'title') return;

            if(input.key === 'stocks' || input.key === 'images'){
                let newValue = [];

                if(input.key === 'stocks' && props.data[input.key]) {
                    newValue = props.data[input.key].map(stock => ({
                        product_size: stock.product_size,
                        stock_quantity: stock.stock_quantity,
                    }));
                }else{
                    if(props.data[input.key]) {
                        newValue = props.data[input.key].map(image => ({
                            image_url: image.url,
                            is_primary: image.is_primary,
                        }));
                    }
                }

                inputs[input.key] = {
                    value: newValue,
                    type: input.key,
                    required: input.required || false,
                };


            }

            if(input.key === 'roles') {
                let roles = ''

                if(props.data[input.key]) roles = props.data[input.key][0].role_name || '';

                inputs[input.key] = {
                    value: roles,
                    type: 'select',
                    required: input.required || false,
                };

                return;
            }

            inputs[input.key] = {
                value: props.data[input.key] || '',
                type: input.type || 'text',
                required: input.required || false,
            }; 
        });
    });
    return inputs;
});

const stocks = ref(props.data.stocks || []);

const hasPrimaryImage = ref(computedInputs.value.images && computedInputs.value.images.value && computedInputs.value.images.value.some(image => image.is_primary));

const validationErrors = ref({});

const uploadedImages = ref([]);

const deletedImages = ref([]);

const getInputsClass = (inputs) => {
    const baseClass = 'grid gap-4';
    if(inputs.length < 3) return `${baseClass} grid-cols-${inputs.length}`;
    return `${baseClass} grid-cols-3`;
}

const getFilteredImages = (primary) => {
    if(!props.data.images) return [];
    return props.data.images.filter(image => image.is_primary == primary);
}

const displayImageError = (image) => {
    return validationErrors.value.images && image.required;
};

const handleClose = () => {
    stocks.value = props.data.stocks || [];
    emit('deleteNewData');
    emit('close');
}

const handleInputChange = (key) => {
    const input = computedInputs.value[key];
    validationErrors.value[key] = '';
    validate(input);
};

const handleNewStock = () => {
    const title = `Agregar stock`;
    const inputs = [
        [
            { label: '', type: 'title' },
            { label: 'Tamaño del producto', key: 'product_size', type: 'text', modifiable: true, required: true },
            { label: 'Cantidad de stock', key: 'stock_quantity', type: 'number', modifiable: true, required: true }
        ]
    ];
    const data = { ...inputs, product_size: '', stock_quantity: 0 };
    createModal(title, inputs, data, 'create', 'stock');
};

const handleDeleteStock = (label, value) => {
    const title = '¿Estás seguro que quieres realizar esta acción?';
    const content = `Al aceptar eliminarás el stock ${label} para este producto. Esta acción no se puede deshacer.`;
    const data = { product_id: props.product_id, product_size: label, stock_quantity: value };
    createConfirmModal(title, content, 'stock', data);
};

const handleImageChanged = (images) => {
    if(images.length > 0) {
        uploadedImages.value = images;
        if(images.some(file => file.is_primary)){
            hasPrimaryImage.value = true;
            if(validationErrors.value.images) validationErrors.value.images = ''    
        }
    }
};

const handleDeleteImage = (image) => {
    deletedImages.value.push(image);
    if(image.is_primary && !uploadedImages.value.some(file => file.is_primary)) hasPrimaryImage.value = false;
};

const handleSubmit = () => {
    validationErrors.value = {};

    const imagesInfo = props.model === 'products' ? {
        hasPrimaryImage: hasPrimaryImage.value,
    } : null;

    if(computedInputs.value.stocks) computedInputs.value.stocks.value = stocks.value;

    const { isValid, inputs } = validate(computedInputs.value, imagesInfo, validationErrors);
    inputs.images = uploadedImages.value;
    inputs.deleted_images = deletedImages.value;
    if(!isValid) return;

    switch(props.type){
        case 'update':
            emit('updateItem', inputs);
            break;
        case 'create':
            switch(props.model){
                case 'stock':
                    emit('addStock', inputs);
                    break;
                case 'products': case 'users':
                    emit('createItem', inputs)
            }
            break;
        case 'delete':
            switch(props.model){
                case 'stock':
                    emit('deleteStock', inputs);
                    break;
                case 'products': 
                    emit('deleteItem', inputs.product_id);
                    break;
                case 'users':
                    emit('deleteItem', inputs.user_id);
                    break;
            }
            break;
    }
};

watch(newData, (newValue) => {
    if(newValue.stocks) {
        stocks.value = newValue.stocks.map(stock => ({
            product_size: stock.product_size,
            stock_quantity: stock.stock_quantity,
        }));
    }
}, { immediate: true, deep: true });

</script>