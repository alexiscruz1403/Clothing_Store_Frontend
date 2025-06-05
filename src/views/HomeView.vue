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
          <GenreCard genreId="1" genreName="Hombres" genreImage="/home/pexels-hombres.png"/>
          <GenreCard genreId="2" genreName="Mujeres" genreImage="/home/pexels-mujeres.png"/>
        </div>
        <div class="px-2 py-5 md:px-10">
          <div class="w-full flex gap-2 md:gap-5 overflow-auto">
            <CategoryCard categoryId="1" categoryName="Remeras" categoryImage="/home/ideogram-remeras.png"/>
            <CategoryCard categoryId="1" categoryName="Abrigos" categoryImage="/home/ideogram-abrigos.png"/>
            <CategoryCard categoryId="1" categoryName="Pantalones" categoryImage="/home/leonardo-pantalones.png"/>
            <CategoryCard categoryId="1" categoryName="Camisas" categoryImage="/home/leonardo-zapatillas.png"/>
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

</script>
