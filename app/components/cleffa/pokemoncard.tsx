/* eslint-disable @next/next/no-img-element */

import { SmallBadges } from "@/components/cleffa/pokemonbadge"
import { PokemonType } from "@/components/cleffa/pokemontype"
import { PokemonModel } from "@/data/pokemon"
import { hexToRGBA, properName } from "@/helpers/utils"

type PokemonCardProps = {
  model: PokemonModel
  color?: string
  showBadges?: boolean
  onSelectPokemon?: (model: PokemonModel) => void
}

export function PokemonCard({ model, color, showBadges, onSelectPokemon }: PokemonCardProps) {

  function selectPokemon() {
    if (onSelectPokemon) {
      onSelectPokemon(model)
    }
  }

  return (
    <button
      className="z-10 group relative flex flex-1 max-w-1/5 min-w-36 min-h-48 bg-white/10 cursor-pointer"
      style={{ backgroundColor: color ? hexToRGBA(color, 0.7) : undefined }}
      onClick={selectPokemon}
    >
      <div className="flex relative h-full w-full items-center justify-center overflow-hidden">
        <img
          className="absolute m-auto scale-125 group-hover:scale-150 transition-transform"
          src={model.artwork ?? model.sprite ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}
          alt={properName(model.name)}
        />
        <div className="absolute bottom-1 text-lg font-semibold text-shadow-lg text-shadow-black">
          {model.species}
        </div>
      </div>
      <div className="z-10 absolute -top-1 -right-1 flex flex-row flex-wrap justify-end gap-1 text-xs">
        {model.types.map((type) => (
          <PokemonType key={`${model.name}_${type}`} type={type} />
        ))}
        {showBadges && (
          <SmallBadges model={model} />
        )}
      </div>
    </button>
  )
}