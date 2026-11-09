import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      metaTitle: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      author: z.string(),
      image: image(),
      imageAlt: z.string(),
      supportImage: image().optional(),
      supportImageAlt: z.string().optional(),
    }),
});

export const collections = { blog };

