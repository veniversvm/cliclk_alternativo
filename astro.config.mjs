// astro.config.mjs
import { defineConfig } from 'astro/config';
import icon from "astro-icon"; // <-- Se habrá añadido esta línea
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [ icon(), mdx()],
  // output: 'server', 
  //  adapter: node({
  //   mode: 'standalone',
  // }),
  site: 'https://clickalternativo.com',
  // https:  'https://veniversvm.github.io',
  // base: '/cliclk_alternativo',
  output: 'static',
});