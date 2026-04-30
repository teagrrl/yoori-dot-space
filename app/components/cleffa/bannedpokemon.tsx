/* eslint-disable @next/next/no-img-element */

import { PokemonModel } from "@/data/pokemon"
import { hexToRGBA, properName } from "@/helpers/utils"

type BannedPokemonProps = {
  model: PokemonModel
  color?: string
  onSelectPokemon?: (model: PokemonModel) => void
}

export function BannedPokemon({ model, color, onSelectPokemon }: BannedPokemonProps) {

  function selectPokemon() {
    if (onSelectPokemon) {
      onSelectPokemon(model)
    }
  }
  
  return (
    <button
      className="group relative max-w-20 flex-2 h-full bg-white/10 cursor-pointer overflow-hidden"
      style={{ backgroundColor: color ? hexToRGBA(color, 0.7) : undefined }}
      onClick={selectPokemon}
    >
      <img
        className="absolute top-0 bottom-0 m-auto saturate-25 opacity-80 scale-125 group-hover:scale-150 transition-transform"
        src={model.artwork ?? model.sprite ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}
        alt={properName(model.name)}
      />
    </button>
  )
}