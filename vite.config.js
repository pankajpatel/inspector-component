// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.js"),
      name: "InspectorComponent",
      // the proper extensions will be added
      fileName: "inspector-component",
    },
    rollupOptions: {
      entry: "./src/index.js",
      output: {
        dir: resolve(__dirname, "dist"),
      },
    },
  },
  plugins: [
    // Babel will try to pick up Babel config files (.babelrc or .babelrc.json)
    babel(),
    // ...
  ],
});
