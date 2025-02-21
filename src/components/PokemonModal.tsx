import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { fetchAbilityEffect } from "../services/pokemonService";
import React from "react";
import { PokemonModalProps } from "../types/pokemon";

export const PokemonModal = ({ isOpen, onClose, pokemonName, pokemonDetails }: PokemonModalProps ) => {
  // Estado para habilidad seleccionada
  const [selectedAbility, setSelectedAbility] = useState<string | null >(null);

  // Habilidad seleccionada
  const [abilityEffect, setAbilityEffect] = useState<string | null >(null);

  if (!pokemonDetails) return null;

  const handleAbilityClick = async (ability: string) => {
    setSelectedAbility(ability);
    setAbilityEffect(null); //Limpiar mientras carga
    const effect = await fetchAbilityEffect(ability);
    setAbilityEffect(effect);
  }
  return (
    <Dialog.Root
      open={isOpen} 
      onOpenChange={() => {
        onClose();
        setSelectedAbility(null);
      }}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-96">
        <Dialog.Title className="text-2xl font-semibold text-gray-800">{pokemonName.charAt(0).toUpperCase()  + pokemonName.slice(1)}</Dialog.Title>
        <Dialog.Close className="absolute top-2 right-2 text-gray-500 hover:text-black">✖</Dialog.Close>

        <div className="mt-4 text-gray-700">
          <p><strong>Tipo:</strong> {pokemonDetails.types.join(", ")}</p>
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