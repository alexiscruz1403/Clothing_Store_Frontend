<template>
    <footer class="bg-[#E8DCCB] flex p-2 md:p-5 justify-between text-[#2E2E2E]">
        <div class="flex flex-col gap-2">
            <p class="font-bold">Servicio</p>
            <div class="text-sm flex flex-col gap-1">
                <p class="cursor-pointer">Seguir tu pedido</p>
                <p class="cursor-pointer">Devoluciones</p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <p class="font-bold">Contacto</p>
            <div class="text-sm flex flex-col gap-1">
                <p class="cursor-pointer">FAQ</p>
                <p class="cursor-pointer">Formulario de contacto</p>
                <p class="cursor-pointer">Nuestra ubicación</p>
            </div>
        </div>
        <div class="flex flex-col gap-2">
            <p class="font-bold">Redes sociales</p>
            <div class="text-sm flex flex-col gap-2">
                <div class="flex gap-1 cursor-pointer">
                    <Instagram />
                    <p>Instagram</p>
                </div>
                <div class="flex gap-1 cursor-pointer">
                    <Facebook />
                    <p>Facebook</p>
                </div>
            </div>
        </div>
    </footer>
</template>
<script setup>

import { Instagram, Facebook } from 'lucide-vue-next';

</script>