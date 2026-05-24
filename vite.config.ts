import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    build: {
        outDir: "",
        emptyOutDir: false,
        lib: {
            entry: "src/main.ts",
            fileName: () => "main.js",
            formats: ["cjs"],
        },
        rolldownOptions: {
            output: {
                assetFileNames(chunkInfo) {
                    if (chunkInfo.names[0] === "fluorite.css")
                        return "styles.css";
                    return "assets/[name]-[hash][extname]";
                },
            },
            external: ["obsidian"],
        },
    },
    define: {
        "process.env.NODE_ENV": '"production"',
    },
});
