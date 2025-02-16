import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { fetchAbilityEffect } from "../services/pokemonService";
import React from "react";

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
  /* Estado para habilidad seleccionada */
  const [selectedAbility, setSelectedAbility] = useState<string | null >(null);
  const [abilityEffect, setAbilityEffect] = useState<string | null >(null);

  if (!pokemonDetails) return null;

  const handleAbilityClick = async (ability: string) => {
    setSelectedAbility(ability);
    setAbilityEffect(null); //Limpiar mientras carga
    const effect = await fetchAbilityEffect(ability);
    setAbilityEffect(effect);
  }
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96">
        <Dialog.Title className="text-lg font-bold">{pokemonName}</Dialog.Title>
        <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</Dialog.Close>

        <div className="mt-4">
          <p><strong>Tipo: </strong> {pokemonDetails.types.join(", ")}</p>
          <p><strong>Peso: </strong> {pokemonDetails.weight} kg</p>
          <p><strong>Habilidades: </strong>
            {pokemonDetails.abilities.map((ability, index, arr) => (
              <React.Fragment key={ability}>
                <span
                  className="text-blue-600 cursor-pointer underline hover:text-blue-800"
                  onClick={() => handleAbilityClick(ability)}
                >
                  {ability}
                </span>
                {index < arr.length - 1 && ", "}
              </React.Fragment>
            ))}
          </p>
          {/* Mostrar detalles de la habilidad seleccionada */}
          {selectedAbility && (
          <div className="mt-4 p-3 border rounded-lg bg-gray-100">
            <h3 className="font-semibold">{selectedAbility}</h3>
            <p>{abilityEffect || "Cargando..."}</p>
          </div>
          )}
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}