import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import WithModel from "@/views/WithModel.vue";
import WithoutModel from "@/views/WithoutModel.vue";
const FromDist = () => import("@/views/FromDist.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: WithModel, alias: ["/model"] },
    { path: "/no-model", component: WithoutModel },
    { path: "/from-dist", component: FromDist },
  ],
});

createApp(App).use(router).mount("#app");
