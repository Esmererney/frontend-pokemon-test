import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  url: z.string().url(),
})

export type Pokemon = z.infer<typeof PokemonSchema>;

export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  types: z.array(z.object({ type: z.object({ name: z.string() }) })).transform((types) => types.map((t) => t.type.name)),
  abilities: z
    .array(z.object({ ability: z.object({ name: z.string() }) }))
    .transform((abilities) => abilities.map((a) => a.ability.name)),
});

export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;