import { useQuery } from "@tanstack/react-query";
import { fetchPokemons, fetchPokemonsDetails } from "../services/pokemonService";

//Consultar listado de pokémon
export const usePokemons = (page: number) => {
  return useQuery({
    queryKey: ["pokemons", page], //Clave única que identifica la consulta. (Caché por página)
    queryFn: () => fetchPokemons(page), //Funcion que obtiene los datos.
    staleTime: 5000, //Optimización 5sg 
    
  });
}

//Buscar detalles del pokémon solo si hay un nombre válido
export const usePokemonDetails = (name: string) => {
  return useQuery({
    queryKey: ["pokemon", name], //Clave única, cada pokémon tiene su propio detalle
    queryFn: () => fetchPokemonsDetails(name),
    enabled: !!name, //Controlar consulta, solo busca si hay un nombre 
  });
};