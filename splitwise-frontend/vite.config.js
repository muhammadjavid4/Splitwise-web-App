import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { reactRouter } from "@react-router/dev/vite"; // ⭐ FIXED

export default defineConfig({
  plugins: [react(), reactRouter()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});