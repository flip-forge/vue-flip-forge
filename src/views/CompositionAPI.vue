<script setup lang="ts">
import FlipForge from "@/lib/flip-forge.vue";
import { useRouteQuery } from "@vueuse/router";
import downloadUrl from "@/assets/lorem_ipsum.pdf";

// eslint-disable-next-line no-useless-assignment
const page = useRouteQuery("page", "0", {
  transform: Number,
  mode: "push",
});

const pages: string[] = [];
const lowResPages: string[] = [];

for (let i = 1; i <= 10; i += 1) {
  pages.push(`https://placeholder.pics/svg/768x400/DEDEDE/555555/Page%20${i}`);
  lowResPages.push(`https://picsum.photos/seed/vue-flip-forge-${i}/384/200`);
}
</script>

<template>
  <flip-forge
    v-model="page"
    :pages="pages"
    :low-res-pages="lowResPages"
    :width="768"
    :height="400"
    :download-url="downloadUrl"
  />
</template>

<style scoped></style>
