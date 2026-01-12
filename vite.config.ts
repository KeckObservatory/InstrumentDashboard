import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { resolve } from 'path';

// const main = resolve(__dirname, 'src/main.tsx');

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  base: './',
  // build: {
  //   chunkSizeWarningLimit: 1000,
  //   minify: false,
  //   outDir: resolve(__dirname, 'dist'),
  //   rollupOptions: {
  //     input: {
  //       main: main,
  //     },
  //   },
  // },
})
