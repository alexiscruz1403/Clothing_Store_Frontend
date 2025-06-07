import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGenreStore = defineStore('genres', () => {
    const genres = ref([]);

    const getGenres = () => {
        if(genres.value.length > 0){
            return genres.value;
        }

        const newGenres = [
            { genre_id: 1, genre_name: 'Hombres', genre_image: '/home/pexels-hombres.png' },
            { genre_id: 2, genre_name: 'Mujeres', genre_image: '/home/pexels-mujeres.png' },
        ];
        genres.value = newGenres;
        return newGenres;
    };

    return {
        genres,
        getGenres,
    };
})