import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import WithModel from "@/views/WithModel.vue";
import WithoutModel from "@/views/WithoutModel.vue";
import WithSVG from "@/views/WithSVG.vue";
import WithSVGPortrait from "@/views/WithSVGPortrait.vue";
const FromDist = () => import("@/views/FromDist.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: WithModel, alias: ["/model"] },
    { path: "/no-model", component: WithoutModel },
    { path: "/from-dist", component: FromDist },
    { path: "/with-svg", component: WithSVG },
    { path: "/with-svg-portrait", component: WithSVGPortrait },
  ],
});

createApp(App).use(router).mount("#app");
