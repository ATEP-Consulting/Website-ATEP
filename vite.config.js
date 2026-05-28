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
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Separamos las dependencias estables (React + router + helmet) en su
        // propio chunk para mejorar el cacheo entre deploys. El resto del
        // código de app se trocea por ruta vía React.lazy en App.jsx.
        manualChunks: {
          'react-vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-helmet-async',
          ],
        },
      },
    },
  },
});
