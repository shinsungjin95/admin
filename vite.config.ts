import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",
  publicDir: "public",
  server: {
    host: "localhost",
    port: 8000,
    open: true,
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@components", replacement: path.resolve(__dirname, "src/components") },
      { find: "@routes", replacement: path.resolve(__dirname, "src/routes") },
      { find: "@styles", replacement: path.resolve(__dirname, "src/styles") },
      { find: "@app", replacement: path.resolve(__dirname, "src/app") },
      { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
    ],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `$injectedColor: orange;`,
      },
    },
  },
  plugins: [react()],
  define: {},
});