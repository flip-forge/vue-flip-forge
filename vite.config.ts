import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig((config) => {
  let build = {};
  if (config.mode === "lib") {
    build = {
      lib: {
        entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        name: "Flip Forge",
        fileName: "vue-flip-forge",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    };
  }
  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 8080,
    },
    build,
  };
});
