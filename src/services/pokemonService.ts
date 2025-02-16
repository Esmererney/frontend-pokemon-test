import axios from "axios";
import z from "zod"
import { PokemonSchema, PokemonDetailSchema } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

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