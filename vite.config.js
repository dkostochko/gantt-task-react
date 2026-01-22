import image from "@rollup/plugin-image";
import react from "@vitejs/plugin-react";
import path from "node:path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { defineConfig } from "vite";

export default defineConfig(() => {
  const configuration = {
    plugins: [peerDepsExternal(), react(), image()],
    build: {
      minify: false,
      lib: {
        name: "gantt-task-react",
        entry: path.resolve(__dirname, "src/index.tsx"),
        formats: ["es", "umd"],
        fileName: format => `gantt-task-react.${format}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "@mui/material",
          "@mui/icons-material",
          "@mui/material/Popper",
          "@mui/material/Paper",
          "@mui/material/ClickAwayListener",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
            "@mui/material": "MaterialUI",
            "@mui/icons-material": "MaterialIcons",
            "@mui/material/Popper": "Popper",
            "@mui/material/Paper": "Paper",
            "@mui/material/ClickAwayListener": "ClickAwayListener",
          },
        },
      },
    },

    test: {
      environment: "jsdom",
      coverage: {
        reporter: ["text", "html"],
      },
    },
  };
  return configuration;
});
