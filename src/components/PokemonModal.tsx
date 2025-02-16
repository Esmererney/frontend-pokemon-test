import * as Dialog from "@radix-ui/react-dialog";

interface PokemonModalProps {
  isOpen: boolean;
  onClose: () => void;
  pokemonName: string;
  pokemonDetails: {
    types: string[];
    weight: number;
    abilities: string[];
  } | null;
}

export const PokemonModal = ({ isOpen, onClose, pokemonName, pokemonDetails }: PokemonModalProps ) => {
  if (!pokemonDetails) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
        <Dialog.Title className="text-lg font-bold">{pokemonName}</Dialog.Title>
        <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</Dialog.Close>

        <div className="mt-4">
          <p><strong>Tipo:</strong> {pokemonDetails.types.join(", ")}</p>
          <p><strong>Peso:</strong> {pokemonDetails.weight} kg</p>
          <p><strong>Habilidades:</strong> {pokemonDetails.abilities.join(", ")}</p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}