import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGenreStore = defineStore('genres', () => {
    const genres = ref([
        { genre_id: 1, genre_name: 'Hombres', genre_image: '/home/pexels-hombres.png', checked: false, display:true },
        { genre_id: 2, genre_name: 'Mujeres', genre_image: '/home/pexels-mujeres.png', checked: false, display:true },
        { genre_id: 3, genre_name: 'Unisex', checked: false, display: false },
    ]);

    const checkGenre = (genreId) => {
        const updatedGenres = genres.value.map((genre) => {
            return genre.genre_id === genreId 
                ? { ...genre, checked: true } 
                : { ...genre, checked: false };
        })
        genres.value = updatedGenres;
    }

    return {
        genres,
        checkGenre
    };
})