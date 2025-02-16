import { useQuery } from "@tanstack/react-query";
import { fetchPokemons, fetchPokemonsDetails } from "../services/pokemonService";

export const usePokemons = (page: number) => {
  return useQuery({
    queryKey: ["pokemons", page],
    queryFn: () => fetchPokemons(page),
    staleTime: 5000, // Optimización
  });
}

export const usePokemonDetails = (name: string) => {
  return useQuery({
  queryKey: ["pokemon", name], 
  queryFn: () => fetchPokemonsDetails(name),
  enabled: !!name,
  });
};