---
# Hemos quitado el campo "image" porque ya no lo necesitamos en el frontmatter.
title: 'Spotify'
pubDate: 2025-08-15T10:00:00Z
description: 'Todo sobre Spotify, el gigante del streaming musical.'
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

Published on: 2022-07-01

Veamos que es Spotify. Aquí te mostramos una galería de imágenes sobre la aplicación y su impacto.

{/* 👇 ¡AQUÍ ESTÁ LA LÍNEA QUE FALTABA! 👇 */}
{/* Esto le dice a Astro: "Renderiza el componente Carousel aquí, y pásale las imágenes que encontraste" */}
<Carousel images={images} />


## Spotify

Spotify ofrece música grabada y podcasts digitales restringidos por derechos de autor que incluyen más de 100 millones de canciones, de sellos discográficos y compañías de medios. También ofrece más de 3 millones de vídeos musicales. Como servicio freemium, las funciones básicas son gratuitas con anuncios y control limitado, mientras que las funciones adicionales, como escuchar sin conexión, sin anuncios comerciales y vídeos musicales hasta 8K, se ofrecen a través de suscripciones pagas. Spotify está actualmente disponible en más de 184 países, a partir de julio de 2023. Los usuarios pueden buscar música según el artista, el álbum o el género y pueden crear, editar y compartir listas de reproducción