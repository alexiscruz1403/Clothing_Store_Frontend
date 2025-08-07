import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useAuthStore } from './useAuthStore';
import { storeToRefs } from 'pinia';
import { fetchAdminDataWithParams, createUser, updateUser, deleteUser, createProduct, updateProduct, deleteProduct, updateOrder, cancelOrder } from '@/api/admin';
import { getFormData } from '@/utils/getFormData';
import { ADMIN_PANEL_OPTIONS } from '@/consts/adminPanelOptions';
import { TABLE_HEADERS } from '@/consts/tableHeaders';
import { INPUTS } from '@/consts/tableInputs';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

export const useAdminStore = defineStore('admin', () => {
    const selectedRole = ref(user.value.roles[0].role_id);
    const adminPanelOptions = ref(ADMIN_PANEL_OPTIONS[selectedRole.value] || []);
    const selectedTable = ref(adminPanelOptions.value[0]);
    const tableHeaders = ref(TABLE_HEADERS[selectedTable.value.value] || []);
    const selectedData = ref([]);
    const selectedInputs = ref(INPUTS[selectedTable.value.value] || []);

    const currentPage = ref(1);
    const lastPage = ref(1);
    const firstPageUrl = ref('');
    const lastPageUrl = ref('');
    const previousPageUrl = ref('');
    const nextPageUrl = ref('');
    const params = ref(null);

    const fetchData = async (newParams = null) => {
        try{
            if(newParams){
                params.value = {};
                params.value.page = newParams.page || null;
                if(newParams.url) {
                    switch(newParams.url){
                        case 'prev':
                            params.value.url = previousPageUrl.value;
                            break;
                        case 'next':
                            params.value.url = nextPageUrl.value;
                            break;
                        case 'first':
                            params.value.url = firstPageUrl.value;
                            break;
                        case 'last':
                            params.value.url = lastPageUrl.value;
                            break;
                        default:
                            params.value.url = currentPage.url;
                            break;
                    }
                }
            }
            const response = await fetchAdminDataWithParams(selectedTable.value.value, params.value);

            selectedData.value = response.data.data;

            firstPageUrl.value = response.data.links.first;
            lastPageUrl.value = response.data.links.last;
            previousPageUrl.value = response.data.links.prev;
            nextPageUrl.value = response.data.links.next;

            currentPage.value = response.data.meta.current;
            lastPage.value = response.data.meta.last;
        }catch(error){
            console.error('Error fetching data:', error);
        }finally{
            tableHeaders.value = TABLE_HEADERS[selectedTable.value.value] || [];
            selectedInputs.value = INPUTS[selectedTable.value.value] || [];
        }
    }

    const createItem = async (data) => {
        const { fileData } = getFormData(data);
    
        try{
            switch(selectedTable.value.value) {
                case 'products':
                    const productResponse = await createProduct(fileData);
                    return productResponse;
                case 'users':
                    const userResponse = await createUser(fileData);
                    return userResponse;
            }
        }catch(error){
            throw new Error(`${error.response.data.message}: ${error.response.data.errors}`);
        }
    }

    const updateItem = async (data) => {
        const { fileData } = getFormData(data, true);
        try{
            switch(selectedTable.value.value) {
                case 'products':
                    const productsResponse = await updateProduct(fileData);
                    return productsResponse;
                case 'users':
                    const userResponse = await updateUser(fileData);
                    return userResponse;
                case 'orders':
                    const orderResponse = await updateOrder(fileData);
                    return orderResponse;
            }
        }catch(error){
            throw new Error(`${error.response.data.message}: ${error.response.data.errors}`);
        }
    }

    const deleteItem = async (item) => {
        const idKey = Object.keys(item)[0];
        const id = item[idKey];
        try{
            switch(selectedTable.value.value) {
                case 'products':
                    const productResponse = await deleteProduct(id);
                    return productResponse;
                case 'users':
                    const userResponse = await deleteUser(id);
                    return userResponse;
                case 'orders':
                    const orderResponse = await cancelOrder(id);
                    return orderResponse;
            }
        }catch(error){
            throw new Error(`${error.response.data.message}: ${error.response.data.errors}`);
        }
    }

    return {
        selectedRole,
        selectedTable,
        adminPanelOptions,
        tableHeaders,
        selectedData,
        selectedInputs,
        currentPage,
        lastPage,
        fetchData,
        createItem,
        updateItem,
        deleteItem
    }
});