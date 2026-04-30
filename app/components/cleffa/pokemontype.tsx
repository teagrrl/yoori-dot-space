import { properName } from "@/helpers/utils"

type PokemonTypeProps = {
  type: string
}

export function PokemonType({ type }: PokemonTypeProps) {
  return (
    <div className={`h-fit px-2 py-0.5 pkmn-detail bg-type-${type} text-center`}>
      <span>{properName(type)}</span>
    </div>
  )
}