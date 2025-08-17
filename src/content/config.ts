import { defineCollection, z } from 'astro:content';

// Define la colección para tus entradas de blog
const blogCollection = defineCollection({
  type: 'content', // significa que son archivos .md o .mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()),
  }),
});

// Exporta tus colecciones
export const collections = {
  'blog': blogCollection,
};