import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: {
        main: "index.html", // The entry point for the React app
        content: "src/content/content.js", // The entry point for the content script
        background: "src/background/background.js", // The entry point for the background script
      },
      output: {
        entryFileNames: (chunkInfo) => {
          if (chunkInfo.name === "content") {
            return "content/content.js";
          }
          if (chunkInfo.name === "background") {
            return "background/background.js";
          }
          // For all other entries, retain the default behavior which includes hashing and assets folder
          return "assets/[name]-[hash].js";
        },
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          // Check if the asset is a CSS file and if it is being imported by 'content'
          if (
            assetInfo.name.includes("content") &&
            assetInfo.name.endsWith(".css")
          ) {
            return "content/content.css";
          }
          // Default asset file name pattern
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
});
