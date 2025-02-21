import { z } from "zod";

//Estructura de pokémon básico con Zod
export const PokemonSchema = z.object({
  name: z.string(), //El nombre debe ser una cadena de texto
  url: z.string().url(), //La URL debe ser una cadena de texto con formato de URL válido
})

//Tipo basado en el Estructura de pokémon básico (PokemonSchema)
export type Pokemon = z.infer<typeof PokemonSchema>;


//Estructura para los detalles de un pokémon
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  types: z
    .array(
      z.object({
        type: z.object({ name: z.string() }) //Cada tipo tiene un objeto con un nombre 
      })
    )
    .transform((types) => types.map((t) => t.type.name)), //Transformamos la estructura para extraer solo los nombres de los tipos
  abilities: z
    .array(z.object({ ability: z.object({ name: z.string() }) }))
    .transform((abilities) => abilities.map((a) => a.ability.name)),
});

//Tipo basado en la estrucura detalles del pokémon (PokemonDetailSchema)
export type PokemonDetail = z.infer<typeof PokemonDetailSchema>;


//Estructura para los efectos de una habilidad de un pokémon
export const AbilityEffectSchema = z.object({
  effect_entries: z.array(
    z.object({
      language: z.object({ name: z.string() }), //Idioma del efecto
      effect: z.string(), //Descripción del efecto
    })
  ),
});

//Tipo basado en la estructura efecto de habilidades (AbilityEffectSchema)
export type AbilityEffect = z.infer<typeof AbilityEffectSchema>

// Estructura para las props del modal de detalles de Pokémon
export interface PokemonModalProps {
  isOpen: boolean; // Controla si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  pokemonName: string; // Nombre del Pokémon seleccionado
  pokemonDetails: PokemonDetail | null; // Puede ser `null` si no hay datos
}
