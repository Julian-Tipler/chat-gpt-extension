import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // The entry point for your React app
        content: "src/content/content.js", // The entry point for your content script
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content") {
            return "content.js";
          }
          if (chunkInfo.name === "background") {
            return "background.js";
          }
          // For all other entries, retain the default behavior which includes hashing and assets folder
          return "assets/[name]-[hash].js";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  assetsInclude: ["src/content/content.css"],
});
