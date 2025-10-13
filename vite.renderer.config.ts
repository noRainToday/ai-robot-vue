import { defineConfig, CSSOptions } from "vite";
import { resolve } from "node:path";

// https://vitejs.dev/config
export default defineConfig(async () => {
  const vue = (await import("@vitejs/plugin-vue")).default;
  const tailwindcss = (await import("@tailwindcss/vite")).default;
  const autoImportPlugin = (await import("unplugin-auto-import/vite")).default;

  return {
    plugins: [
      vue(),
      tailwindcss(),
      autoImportPlugin({
        imports: ["vue", "vue-router", "pinia", "@vueuse/core", "vue-i18n"],
        dts: "renderer/auto-imports.d.ts",
      }),
    ],
    css: {
      transformer: "lightningcss" as CSSOptions["transformer"],
    },
    build: {
      target: "es2022",
      publicDir: "public",
      rollupOptions: {
        input: [
          resolve(__dirname, "html/index.html"),
          resolve(__dirname, "html/setting.html"),
          resolve(__dirname, "html/dialog.html"),
        ],
      },
    },
    resolve: {
      alias: {
        "@common": resolve(__dirname, "common"),
        "@renderer": resolve(__dirname, "renderer"),
        "@main": resolve(__dirname, "main"),
        "@locales": resolve(__dirname, "locales"),
      },
    },
  };
});
