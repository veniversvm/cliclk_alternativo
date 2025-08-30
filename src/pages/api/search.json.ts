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

  // Usamos la misma lógica que en [tag].astro para añadir la imagen de portada
  const postsWithExtraData = await Promise.all(
    allPosts.map(async (post) => {
      const postDir = dirname(post.id);
      const searchPath = `/src/content/blog/${postDir}/`.toLowerCase();
      const imagePath = Object.keys(allImages).find((path) =>
        path.toLowerCase().startsWith(searchPath),
      );

      let coverImage = null;
      if (imagePath) {
        const imageModule = (await allImages[imagePath]()) as any;
        coverImage = imageModule.default;
      }

      // Devolvemos un objeto plano con los datos que necesitamos para la búsqueda Y el renderizado
      return {
        slug: post.slug,
        title: post.data.title,
        description: post.data.description,
        tags: post.data.tags,
        pubDate: post.data.pubDate,
        externalUrl: post.data.externalUrl,
        coverImage: coverImage, // ¡Aquí está la imagen!
        author: post.data.author,
      };
    })
  );

  return new Response(JSON.stringify(postsWithExtraData), {
    headers: { 'Content-Type': 'application/json' },
  });
};