<template>
  <flip-forge v-model="page" :pages="pages" :download-url="downloadUrl" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlipForge from "@/lib/flip-forge.vue";
import { useRouteQuery } from "@vueuse/router";
import downloadUrl from "@/assets/lorem_ipsum.pdf";

export default defineComponent({
  components: { FlipForge },
  data() {
    return {
      downloadUrl,
      page: useRouteQuery("page", "0", {
        transform: Number,
        mode: "push",
      }),
    };
  },
  computed: {
    pages() {
      const result = [];
      for (let i = 1; i <= 10; i += 1) {
        result.push(
          `https://placeholder.pics/svg/400x768/DEDEDE/555555/Page%20${i}`,
        );
      }
      return result;
    },
  },
});
</script>
