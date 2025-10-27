import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "103.140.87.111:10140/api/v1",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

//blank commit
