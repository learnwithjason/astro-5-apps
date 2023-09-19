import { z, defineCollection } from 'astro:content';

export const collections = {
  frenchies: defineCollection({
    type: 'data',
    schema: z.object({
      id: z.number(),
      name: z.string(),
      image: z.object({
        src: z.string(),
        alt: z.string(),
      }),
    }),
  }),
};
