<template>
    <td v-if="htmlContent" v-html="htmlContent" class="p-2 text-left"></td>
    <td v-else-if="listContent" class="p-2 text-left">
        <Button 
            :label="listButtonLabel" 
            color="tertiary" 
            @click="handleListClick" 
        />
    </td>
    <td v-else-if="isActionsColumn" class="p-2 text-left">
        <div class="flex gap-2" v-if="isEditDeleteColumn">
            <Button 
                label="Editar" 
                color="primary" 
                @click="handleUpdateData"
            />
            <Button 
                label="Eliminar" 
                color="cancel" 
                @click="handleDeleteData"
            />
        </div>
        <div class="flex gap-2" v-else-if="isViewDetailColumn">
            <Button 
                label="Ver detalles" 
                color="primary" 
                @click="handleViewDetail"
            />
        </div>
        <div class="flex gap-2" v-else>
            <Button 
                label="Avanzar" 
                color="primary" 
                :disabled="isProceedDisabled" 
                @click="handleProceedOrder()"
            />
            <Button 
                label="Cancelar" 
                color="cancel" 
                :disabled="isCancelDisabled" 
                @click="handleCancelOrder()"
            />
        </div>
    </td>
    <td v-else class="p-2 text-left">{{ props.data }}</td>
</template>
<script setup>

import Button from '../Buttons/Button.vue';
import { computed, defineEmits, inject, ref } from 'vue';
import { getImgSrc } from '@/utils/getImgSrc';

const props = defineProps({
    header: {
        type: Object,
    },
    data: {
        type: [Array, String, Number],
    }
});

const emit = defineEmits(['update-item', 'delete-item', 'view-detail', 'proceed-order', 'cancel-order']);

const createShowModal = inject('createShowModal');

const isActionsColumn = computed(() => props.header.special === 'actions' || props.header.special === 'detail');

const isEditDeleteColumn = computed(() => props.header.key === 'edit-delete');

const isViewDetailColumn = computed(() => props.header.special === 'detail');

const isProceedDisabled = computed(() => isActionsColumn.value && props.data.some(item => item.status_name === 'Cancelado' || item.status_name === 'Entregado' || item.status_name === 'Rechazado'));

const isCancelDisabled = computed(() => isActionsColumn.value && props.data.some(item => item.status_name === 'Cancelado' || item.status_name === 'Entregado'));

const htmlContent = computed(() => {
    switch(props.header.special){
        case 'stocks':
            return props.data.map(item => `${item.product_size}: ${item.stock_quantity}`).join('</br>');
        case 'roles':
            return props.data.map(role => role.role_name).join('</br>');
        case 'links':
            return props.data.map((image, index) => { 
                return `<a href="${getImgSrc(image.image_url)}" target="_blank">Imagen ${index+1}</a>`
            }).join('</br>');
        default:
            return null;
    }
});

const listButtonLabel = ref('Ver lista');

const listContent = computed(() => {
    switch(props.header.special){
        case 'products':
            listButtonLabel.value = 'Ver productos';
            return true;
        case 'statuses':
            listButtonLabel.value = 'Ver estados';
            return true;
        default:
            return null;
    }
});

const handleUpdateData = () => {
    emit('update-item');
};

const handleDeleteData = () => {
    emit('delete-item');
};

const handleViewDetail = () => {
    emit('view-detail');
}

const handleProceedOrder = () => {
    if(isProceedDisabled.value) return;
    emit('proceed-order');
};

const handleCancelOrder = () => {
    if(isCancelDisabled.value) return;
    emit('cancel-order');
};

const handleListClick = () => {
    createShowModal(props.data, props.header.key);

};

</script>