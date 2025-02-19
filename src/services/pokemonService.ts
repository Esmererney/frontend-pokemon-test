import axios from "axios";
import z from "zod";
import { PokemonSchema, PokemonDetailSchema, AbilityEffectSchema } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon";
const ABILITY_API_URL = "https://pokeapi.co/api/v2/ability";

/**
 * Función para obtener una lista de Pokémon paginada.
 * @param page - Número de página (por defecto 1).
 * @param limit - Cantidad de Pokémon por página (por defecto 10).
 * @returns Un array de Pokémon validados con Zod.
*/
export const fetchPokemons = async (page: number = 1, limit: number = 10) => {
    try {
      //Calcular el desplazamiento (offset) para la paginación
      const offset = (page - 1 ) * limit;
      
      //Petición GET a la API con los parámetros de paginación
      const response = await axios.get(`${API_URL}?offset=${offset}&limit=${limit}`);
      
      //Validar respuesta de la API
      const Schema = z.object({
        results: PokemonSchema.array(),
      });

      //Validación de datos y retornar solo la lista de pokémon
      return Schema.parse(response.data).results;
    } catch (error) {
      console.error("Error al obtener lista de Pokémon"+ error);
      throw new Error("Error al obtener lista de Pokémon");
      
    }

}

/**
 * Función para obtener los detalles de un Pokémon en específico.
 * @param name - Nombre del Pokémon.
 * @returns Un objeto con los detalles del Pokémon, validado con Zod.
*/
export const fetchPokemonsDetails = async (name: string) => {
  try {
    //Petición GET para obtener los detalles del pokémon por su nonmbre
    const response = await axios.get(`${API_URL}/${name}`);

    //Validación y retorno de los datos del pokémon
    return PokemonDetailSchema.parse(response.data) 
  } catch (error) {
    console.log("Error obteniendo detalles del Pokémon:", error);
    throw new Error("No se pudieron obtener los detalles del Pokémon.")
  }
}

/**
 * Función para obtener el efecto de una habilidad de un Pokémon.
 * @param abilityName - Nombre de la habilidad.
 * @returns La descripción del efecto en español o inglés (si está disponible).
*/
export const fetchAbilityEffect = async (abilityName: string) => {
  try {

    //Petición GET para obtener los detalles de la habilidad
    const response = await axios.get(`${ABILITY_API_URL}/${abilityName}`)

    //Validacipon de la respuesta
    const validatedData = AbilityEffectSchema.parse(response.data);

    // Buscar primero en español, si no hay, busca en inglées
    const effectEntry = 
      validatedData.effect_entries.find((entry => entry.language.name === "es")) ||
      validatedData.effect_entries.find((entry => entry.language.name === "en"))
      
      //Retorna el efecto si se encontró, de lo contrario, indica que no esta disponible
      return effectEntry ? effectEntry.effect : "Efecto no disponible"
  } catch (error) {
    //Manejo de errores si a petición falla
    console.log("Error obteniendo los efectos de las habilidades del Pokémon", error)
    throw new Error("Error obteniendo los efectos de las habilidades del Pokémon")
  }
}