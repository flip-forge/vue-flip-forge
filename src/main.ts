import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import WithModel from "@/views/WithModel.vue";
import WithoutModel from "@/views/WithoutModel.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: "with-model", path: "/", component: WithModel, alias: ["/model"] },
    { name: "without-model", path: "/no-model", component: WithoutModel },
  ],
});

createApp(App).use(router).mount("#app");
