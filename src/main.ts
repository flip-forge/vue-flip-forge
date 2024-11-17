import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import WithModel from "@/views/WithModel.vue";
import WithoutModel from "@/views/WithoutModel.vue";
import WithSVG from "@/views/WithSVG.vue";
import WithSVGPortrait from "@/views/WithSVGPortrait.vue";
import WithLowRes from "@/views/WithLowRes.vue";
import HomeView from "@/views/HomeView.vue";
import CompositionAPI from "@/views/CompositionAPI.vue";
const FromDist = () => import("@/views/FromDist.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomeView },
    { path: "/model", component: WithModel },
    { path: "/no-model", component: WithoutModel },
    { path: "/from-dist", component: FromDist },
    { path: "/with-svg", component: WithSVG },
    { path: "/with-svg-portrait", component: WithSVGPortrait },
    { path: "/with-low-res", component: WithLowRes },
    { path: "/composition-api", component: CompositionAPI },
  ],
});

createApp(App).use(router).mount("#app");
