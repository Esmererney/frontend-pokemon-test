import { useState } from "react";
import { usePokemons } from "../hooks/usePokemons";

const PokemonTable = () => {
  const [page, setPage] = useState(1);
  const { data: pokemons, isLoading, error } = usePokemons(page);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Pokémon</h1>
      <table className="w-full border-collapse border border-graty-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Imagen</th>
          </tr>
        </thead>
        <tbody>
          {pokemons?.map((pokemon) => (
            <tr key="pokemon.name">
              <td className="border p-2">{pokemon.name}</td>
              <td className="border p-2">
                <img src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`} alt={pokemon.name} className="w-16 h-16"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} className="bg-blue-500 text-white px-4 py-2 rounded">
          Anterior
        </button>
        <span>Página {page}</span>
        <button onClick={() => setPage((p) => p + 1)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default PokemonTable;