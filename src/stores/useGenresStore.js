import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGenreStore = defineStore('genres', () => {
    const genres = ref([]);

    const fetchGenres = async () => {
        if(genres.value.length <= 0){
            const newGenres = [
                { genre_id: 1, genre_name: 'Hombres', genre_image: '/home/pexels-hombres.png', checked: false },
                { genre_id: 2, genre_name: 'Mujeres', genre_image: '/home/pexels-mujeres.png', checked: false },
            ];
            genres.value = newGenres;   
        }
    };

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
        fetchGenres,
        checkGenre,
    };
})