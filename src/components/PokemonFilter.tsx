import { useState } from "react";

interface PokemonFilterProps {
  onSearch: (searchTerm: string) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({ onSearch }) => {
  const [searchTerm, setsearchTerm] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setsearchTerm(value);
    onSearch(value);
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