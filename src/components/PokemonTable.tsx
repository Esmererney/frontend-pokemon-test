import { useState, useEffect } from "react";
import { usePokemonDetails, usePokemons } from "../hooks/usePokemons";
import { PokemonModal } from "./PokemonModal";
import PokemonFilter from "./PokemonFilter";

const PokemonTable = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const { data: pokemons, isLoading, error } = usePokemons(page);
  const {data: pokemonDetails} = usePokemonDetails(selectedPokemon || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons || [])

  //Filtrar los pokémon por nombre
  useEffect(() => {
    if (pokemons) {
      setFilteredPokemons(
        pokemons.filter((pokemon) => 
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, pokemons])

  if (isLoading) return <p className="text-center text-xl">Cargando...</p>;
  if (error) return <p className="text-center text-xl text-red-500">Error al cargar los datos.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Lista de Pokémon</h1>
      
      {/* Filtro de busqueda */}
      <PokemonFilter onSearch={setSearchTerm}/>
      
      <div className="oveflow-x-auto">
        <table className="w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-center">Nombre</th>
              <th className="px-4 py-2 text-center">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {/* {pokemons?.map((pokemon) => (
              <tr key={pokemon.name}>
                <td className="border p-2">{pokemon.name}</td>
                <td className="border p-2" onDoubleClick={() => setSelectedPokemon(pokemon.name)}>
                  <img 
                    src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                    alt={pokemon.name}
                    className="w-16 h-16"/>
                </td>
              </tr>
            ))} */}

            {filteredPokemons?.map((pokemon, index) => (
              <tr
                key={pokemon.name}
                className={`hover:bg-blue-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-4 py-2">{pokemon.name.charAt(0).toUpperCase()  + pokemon.name.slice(1)}</td>
                <td
                  className="px-4 py-2 cursor-pointer"
                  onDoubleClick={() => setSelectedPokemon(pokemon.name)}>
                  <img 
                    src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
                    alt={pokemon.name}
                    className="w-16 h-16 mx-auto"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal */}
      <PokemonModal
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        pokemonName={selectedPokemon || ""}
        pokemonDetails={pokemonDetails ?? null}
      />
      
      {/* Paginación */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Anterior
        </button>
        <span className="self-center text-gray-600">Página {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  )
}

export default PokemonTable;