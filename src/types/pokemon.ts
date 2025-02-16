import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})

export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonDetailScrema = z.object({
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string().url(),
  })
});

export type PokemonDetail = z.infer<typeof PokemonDetailScrema>;