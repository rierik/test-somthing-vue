import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     inko: '/node_modules/inko/inko.min.js', // 'inko'를 'inko.min.js'로 매핑
  //   },
  // },
  server: {
    host: true,
  },
});
