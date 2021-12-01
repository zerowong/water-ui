import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react()],
    server: {
      port: 8083,
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      lib: {
        entry: 'src/index.ts',
        name: 'WaterUIReact',
        formats: ['umd'],
        fileName() {
          return `waterui-react.min.js`
        },
      },
      rollupOptions: {
        external: ['react'],
        output: {
          globals: {
            react: 'React',
          },
        },
      },
    },
  }
  if (mode === 'development') {
    config.root = './playground'
  }
  return config
})
