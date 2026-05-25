// @ts-check
import { defineConfig } from 'astro/config';
import { webcore } from 'webcoreui/integration';

// https://astro.build/config
export default defineConfig({
  site: 'https://owenbueno.github.io',
  base: '/utiliz/',
  output: 'static',
  integrations: [webcore()],
});
