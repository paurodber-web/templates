import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [preact()],
  base: process.env.ASTRO_BASE_PATH || '/',
  server: { host: true },
  vite: { plugins: [tailwindcss()] },
});
