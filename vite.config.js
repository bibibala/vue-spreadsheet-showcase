import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      "@handsontable/vue3",
      "@univerjs/presets",
      "ag-grid-community",
      "ag-grid-vue3",
      "handsontable",
      "jspreadsheet-ce",
      "jsuites",
      "vue",
      "vue-router",
    ],
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
    extensions: [".js", ".vue", ".json"],
  },
});
