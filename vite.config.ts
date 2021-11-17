import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [reactRefresh()],
    server: {
      port: 8083,
      open: true,
    },
    build: {
      outDir: 'umd',
      lib: {
        entry: 'src/index.ts',
        name: 'WaterUI',
        formats: ['umd'],
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
