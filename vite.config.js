import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Las fuentes de fontsource vienen con font-display:swap, lo que las mete en
// el camino crítico del primer pintado. Con `optional` el texto pinta al
// instante con la fuente de sistema y las webfonts se aplican en cuanto
// llegan (y quedan cacheadas). Auditoría de rendimiento ago 2026.
const fontDisplayOptional = () => ({
  name: 'font-display-optional',
  generateBundle(_, bundle) {
    for (const file of Object.values(bundle)) {
      if (file.type === 'asset' && file.fileName.endsWith('.css')) {
        file.source = String(file.source).replaceAll(
          'font-display:swap',
          'font-display:optional',
        );
      }
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), fontDisplayOptional()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // manifest.json para que inject-modulepreload.mjs mapee ruta → chunk
    manifest: true,
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
