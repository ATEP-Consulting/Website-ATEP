import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // react-snap usa una versión vieja de Puppeteer/Chromium que no soporta
    // optional chaining (?.). Bajamos el target para que esbuild transpile
    // esa sintaxis y el bundle se ejecute en el Chromium del prerender.
    target: 'es2017',
  },
});
