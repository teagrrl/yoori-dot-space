/* eslint-disable @next/next/no-img-element */

import { PokemonType } from "@/components/cleffa/pokemontype"
import { PokemonModel } from "@/data/pokemon"
import { cn, hexToRGBA, properName } from "@/helpers/utils"

type PickedPokemonProps = {
  model: PokemonModel
  align?: "left" | "right"
  color?: string
  onSelectPokemon?: (model: PokemonModel) => void
}

export function PickedPokemon({ model, align, color, onSelectPokemon }: PickedPokemonProps) {
  let alignClasses: [string, string]
  switch(align) {
    case "left":
      alignClasses = ["left-2", "right-0"]
      break
    case "right":
      alignClasses = ["right-2", "-left-1"]
      break
    default:
      alignClasses = ["", ""]
  }

  function selectPokemon() {
    if (onSelectPokemon) {
      onSelectPokemon(model)
    }
  }
  
  return (
    <button
      className="group relative flex-2 h-full w-full bg-white/10 cursor-pointer"
      style={{ backgroundColor: color ? hexToRGBA(color, 0.7) : undefined }}
      onClick={selectPokemon}
    >
      <div className="flex relative h-full w-full items-center justify-center overflow-hidden">
        <img
          className="absolute m-auto scale-125 group-hover:scale-150 transition-transform"
          src={model.artwork ?? model.sprite ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}
          alt={properName(model.name)}
        />
        {align !== undefined && (
          <div className={cn("absolute bottom-1 text-lg font-semibold text-shadow-lg text-shadow-black", alignClasses[0])}>
            {model.species}
          </div>
        )}
      </div>
      <div className={cn("z-10 absolute -top-1 flex flex-row flex-wrap justify-end gap-1 text-sm", alignClasses[1])}>
        {model.types.map((type) => <PokemonType key={`${model.name}_${type}`} type={type} />)}
      </div>
    </button>
  )
}