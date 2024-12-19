import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
// import { ViteAliases } from "vite-aliases";
import path from "path";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    server: {
        port: 5173,
        host: "0.0.0.0",
        hmr: true
    },
    build: {
        rollupOptions: {
            output: {
                entryFileNames: "main.js",
                assetFileNames: "assets/[name][extname]",
                manualChunks: undefined
            }
        }
    },
    plugins: [
        legacy({
            modernPolyfills: [
                /* ... */
            ],
            renderLegacyChunks: false
        }),
        react(),
        svgr()
        // ViteAliases()
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@/app": path.resolve(__dirname, "./src/app"),
            "@/pages": path.resolve(__dirname, "./src/pages"),
            "@/widgets": path.resolve(__dirname, "./src/widgets"),
            "@/features": path.resolve(__dirname, "./src/features"),
            "@/entities": path.resolve(__dirname, "./src/entities"),
            "@/shared": path.resolve(__dirname, "./src/shared")
        }
    }
});
