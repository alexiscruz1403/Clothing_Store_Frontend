<template>
  <main class="bg-black flex flex-col min-h-screen">
      <Header />
      <div class="bg-[#E8DCCB]">
        <div class="h-72 lg:h-80 w-full flex justify-center md:text-[#2E2E2E]">
          <div class="h-full w-full md:w-[45%] flex flex-col gap-5 justify-center items-center">
            <div class="text-3xl">Logo</div>
            <h1 class="font-['Outfit'] text-3xl md:text-4xl">Casual es tu actitud</h1>
            <p class="font-['Sora'] text-md md:text-lg w-[90%] md:w-full">Ropa urbana que expresa tu identidad. Para la calle, para vos, para todos los días</p>
            <Button label="Explorar"/>
          </div>
        </div>
        <div class="flex flex-col md:flex-row gap-2 md:gap-5 px-2 md:px-10">
          <GenreCard v-for="genre in genres" :genreId="genre.genre_id" :genreName="genre.genre_name" :genreImage="genre.genre_image" :key="genre.genre_name"/>
        </div>
        <div class="px-2 py-5 md:px-10">
          <div class="w-full flex gap-2 md:gap-5 overflow-auto">
            <CategoryCard v-for="category in categories" :categoryId="category.category_id" :categoryName="category.category_name" :categoryImage="category.category_image"/>
          </div>
        </div>
      </div>
      <Footer />
  </main>
</template>

<script setup>

import Header from '@/components/layout/Header.vue';
import Footer from '@/components/layout/Footer.vue';
import Button from '@/components/ui/Buttons/Button.vue';
import GenreCard from '@/components/ui/Cards/GenreCard.vue';
import CategoryCard from '@/components/ui/Cards/CategoryCard.vue';
import { useGenreStore } from '@/stores/useGenresStore';
import { useCategoriesStore } from '@/stores/useCategoriesStore';

const genreStore = useGenreStore();
const categoryStore = useCategoriesStore();

const genres = genreStore.getGenres();
const categories = categoryStore.getCategories();

</script>
