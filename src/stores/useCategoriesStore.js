import { ref } from "vue";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref([]);

    const getCategories = () => {
        if (categories.value.length > 0) {
            return categories.value;
        }

        const newCategories = [
            { category_id: 1, category_name: 'Remeras', category_image: '/home/ideogram-remeras.png' },
            { category_id: 2, category_name: 'Pantalones', category_image: '/home/leonardo-pantalones.png' },
            { category_id: 3, category_name: 'Zapatillas', category_image: '/home/leonardo-zapatillas.png' },
            { category_id: 4, category_name: 'Abrigos', category_image: '/home/ideogram-abrigos.png' }
        ];
        categories.value = newCategories;
        return newCategories;
    };

    return {
        categories,
        getCategories,
    };
})