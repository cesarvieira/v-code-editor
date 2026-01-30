import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

export default defineConfig({
  root: resolve(dir, './'),
  plugins: [vue()],
  resolve: {
    alias: {
      'v-code-editor': resolve(dir, '../src'),
      '@cesarv/v-code-editor': resolve(dir, '../src'),
    },
  },
});
