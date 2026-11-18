// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://kalebmlpz.github.io',
  base: '/sprint-en-la-vecindad',
  vite: {
    plugins: [tailwindcss()],
  },
});
