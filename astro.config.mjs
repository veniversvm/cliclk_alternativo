// astro.config.mjs
import { defineConfig } from 'astro/config';
import icon from "astro-icon"; // <-- Se habrá añadido esta línea
import node from '@astrojs/node';
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [ icon(), mdx()],
  //  output: 'server', 
  //  adapter: node({
  //   mode: 'standalone',
  // }),
  https:  'https://veniversvm.github.io',
  base: '/cliclk_alternativo',
  output: 'static',
});