import { ref } from "vue";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('categories', () => {
    const categories = ref([
            { category_id: 1, category_name: 'Remeras', category_image: '/home/ideogram-remeras.png', checked: false },
            { category_id: 2, category_name: 'Pantalones', category_image: '/home/leonardo-pantalones.png', checked: false },
            { category_id: 3, category_name: 'Zapatillas', category_image: '/home/leonardo-zapatillas.png', checked: false },
            { category_id: 4, category_name: 'Abrigos', category_image: '/home/ideogram-abrigos.png', checked: false },
    ]);

    const checkCategory = (categoryIds) => {
        const updatedCategories = categories.value.map((category) => {
            return categoryIds.includes(category.category_id) 
                ? { ...category, checked: true } 
                : { ...category, checked: false };
        })
        categories.value = updatedCategories;
    }

    return {
        categories,
        checkCategory
    };
})