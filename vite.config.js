import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from "vite-plugin-environment";
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(["REACT_APP_SHOW_VERSION", "REACT_APP_API_PATH"]),
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api'),
      components: path.resolve(__dirname, 'src/components'),
      context: path.resolve(__dirname, 'src/context'),
      pages: path.resolve(__dirname, 'src/pages'),
      services: path.resolve(__dirname, 'src/services'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },
});