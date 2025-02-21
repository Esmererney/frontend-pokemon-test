import { useState } from "react";

// Interfaz para las props que recibe el componente
interface PokemonFilterProps {
  // Función que recibe el término de búsqueda y lo envía al padre
  onSearch: (searchTerm: string) => void; 
}

// Componente funcional que filtra Pokémon basado en el input del usuario
const PokemonFilter = ({ onSearch }: PokemonFilterProps) => {
  const [searchTerm, setsearchTerm] = useState("");  // Estado local para almacenar el término de búsqueda

  // Maneja el cambio en el input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Obtiene valor del input
    setsearchTerm(value); // Actualiza estado con el nuevo valor
    onSearch(value); // Llama funcion con el nuevo valor
  }

  return (
    <div className="mb-4 w-80">
      <input type="text" 
      placeholder="Buscar Pokémon..."
      value={searchTerm}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    </div>
  )
}

export default PokemonFilter;