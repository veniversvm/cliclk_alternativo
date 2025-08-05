// astro.config.mjs
import { defineConfig } from 'astro/config';
import icon from "astro-icon"; // <-- Se habrá añadido esta línea

// https://astro.build/config
export default defineConfig({
  integrations: [
    icon(), // <-- Y esta otra línea
    // ...otras integraciones que tengas
  ]
});