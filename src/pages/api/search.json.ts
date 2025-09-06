// src/pages/api/search.json.ts
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { dirname } from 'node:path';

// Obtenemos todas las imágenes una sola vez
const allImages = await import.meta.glob(
  "/src/content/blog/**/*.{jpeg,jpg,png,gif,webp,svg}",
);

export const GET: APIRoute = async () => {
  const allPosts = await getCollection('blog');

  const postsWithExtraData = await Promise.all(
    allPosts.map(async (post) => {
      const postDir = dirname(post.id);
      // La ruta de búsqueda debe coincidir con la estructura del proyecto
      const searchPath = `/src/content/blog/${postDir}/`.toLowerCase();
      const imagePath = Object.keys(allImages).find((path) =>
        path.toLowerCase().startsWith(searchPath),
      );

      let coverImage = null;
      if (imagePath) {
        // Ejecutamos la función para obtener el módulo de la imagen
        const imageModule = (await allImages[imagePath]()) as any;
        coverImage = imageModule.default;
      }

      return {
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        tags: post.data.tags,
        pubDate: post.data.pubDate,
        externalUrl: post.data.externalUrl,
        coverImage: coverImage,
        author: post.data.author,
      };
    })
  );

  return new Response(JSON.stringify(postsWithExtraData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};