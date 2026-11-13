// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kalebmlpz.github.io',
  base: '/Admon2.0',
  vite: {
    plugins: [tailwindcss()],
  },
});
