---
# Hemos quitado el campo "image" porque ya no lo necesitamos en el frontmatter.
title: 'Lorem'
pubDate: 2025-08-15T10:00:00Z
description: 'Lorem ipsum dolor.'
author: 'Luigi Skull'
tags: ["musica", "repoductores", "online"]
---
{/* 
  Esta es la sección de script de MDX.
  Se ejecuta en el servidor durante la construcción de la página.
*/}
import Carousel from '../../../components/Carousel.astro';

// ¡Esta línea es la clave! Importa todas las imágenes de la carpeta actual.
const images = await import.meta.glob('./*.{jpeg,jpg,png,webp}');


# My First Blog Post

Published on: 2022-07-02

Veamos que es Spotify. Aquí te mostramos una galería de imágenes sobre la aplicación y su impacto.

{/* 👇 ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA! 👇 */}
{/* Esto le dice a Astro: "Renderiza el componente Carousel aquí, y pásale las imágenes que encontraste" */}
<Carousel images={images} />


## Spotify

"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."