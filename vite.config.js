import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import inject from "@rollup/plugin-inject";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()]
// })

export default defineConfig({
  build: {
    define: {
      "process.env": process.env,
    },
    rollupOptions: {
      plugins: [inject({ Buffer: ["buffer", "Buffer"] })],
      define: {
        process: {env:{}},
    },

      optimizeDeps: {
        esbuildOptions: {
          // Node.js global to browser globalThis
          define: {
            global: "globalThis",
          },
        },
      },
   },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
  resolve: { 
    mainFields: ['browser', 'module', 'main']

  }
});

