<template>
  <component
    :is="flipForge"
    v-if="flipForge"
    v-model="page"
    :pages="pages"
    :download-url="downloadUrl"
  />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";
import { useRouteQuery } from "@vueuse/router";
import downloadUrl from "@/assets/lorem_ipsum.pdf";

export default defineComponent({
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
    flipForge() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: Only works after build
      return defineAsyncComponent(() => import("../../"));
    },
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
