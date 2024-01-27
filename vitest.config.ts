import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    exclude: ['**/node_modules/**', 'nuxt.config.ts', '**/.{idea,git,cache,output,temp,nuxt,eslintrc.cjs}/**'],
    coverage: {
      exclude: ['**/node_modules/**', 'nuxt.config.ts', '**/.{idea,git,cache,output,temp,nuxt,eslintrc.cjs}/**'],
    },
  },
});
