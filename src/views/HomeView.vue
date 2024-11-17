<template>
  <ul>
    <li v-for="route in $router.getRoutes()" :key="route.path">
      <router-link :to="route.path">{{ route.path }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
});
</script>

<style scoped>
li {
  margin: 1rem 0;
}

a {
  font-size: 2rem;
  font-weight: bold;
  color: #4b67fa;
  text-decoration: none;
}
a:visited {
  color: #4b67fa;
}
</style>
