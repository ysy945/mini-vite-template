import { defineConfig } from "mini-vite-ysy";
import path from "path";
//如果需要热更新请下载
//import react from "vite-plugin-refresh-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    entries: ["./index.html"], //预构建扫描模块
  },
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: ["./src/main.tsx"], //打包开始的模块
    },
  },
  plugins: [
    //...react(),
    {
      name: "vite:virtual-module",
      enforce: "pre",
      resolveId(id) {
        if (id === "virtual:vite-module") {
          return "/" + id;
        }
      },
      load(id) {
        if (id === "/virtual:vite-module") {
          return `export default {a:1}`;
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/assets"),
    },
  },
});
