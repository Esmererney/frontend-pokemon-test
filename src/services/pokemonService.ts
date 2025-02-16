import axios from "axios";
import z from "zod";
import { PokemonSchema, PokemonDetailSchema, AbilityEffectSchema } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const ABILITY_API_URL = "https://pokeapi.co/api/v2/ability";

export const fetchPokemons = async (page: number = 1, limit: number = 10) => {
  const offset = (page - 1 ) * limit;
  const response = await axios.get(`${API_URL}?offset=${offset}&limit=${limit}`);
  
  // Validar el objeto completo con Zod
  const Schema = z.object({
    results: PokemonSchema.array(),
  });

  return Schema.parse(response.data).results;

}

export const fetchPokemonsDetails = async (name: string) => {
  const response = await axios.get(`${API_URL}/${name}`);
  return PokemonDetailSchema.parse(response.data)
}

export const fetchAbilityEffect = async (abilityName: string) => {
  try {
    const response = await axios.get(`${ABILITY_API_URL}/${abilityName}`)
    const validatedData = AbilityEffectSchema.parse(response.data);

    // Buscar primero en español, si no hay, busca en inglées
    const effectEntry = 
      validatedData.effect_entries.find((entry => entry.language.name === "es")) ||
      validatedData.effect_entries.find((entry => entry.language.name === "en"))
      
      return effectEntry ? effectEntry.effect : "Efecto no disponible"
  } catch (error) {
    return `No se pudo obtener la información` + error;
  }
}