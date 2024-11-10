<template>
  <flip-forge :pages="pages" :download-url="downloadUrl" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FlipForge from "@/components/flip-forge.vue";
import downloadUrl from "@/assets/lorem_ipsum.pdf";

export default defineComponent({
  components: { FlipForge },
  data() {
    return {
      downloadUrl,
    };
  },
  computed: {
    pages() {
      const result = [];
      for (let i = 1; i <= 10; i += 1) {
        result.push(`https://picsum.photos/seed/vue-flip-forge-${i}/768/400`);
      }
      return result;
    },
  },
});
</script>
