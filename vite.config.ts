import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  // If you need to configure specific handling for assets or other features
  assetsInclude: ['**/*.gltf', '**/*.glb', '**/*.obj', '**/*.mtl'],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          maplibre: ['maplibre-gl']
        }
      }
    }
  }
});