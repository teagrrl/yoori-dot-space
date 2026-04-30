"use client"

import { motion } from "motion/react"
import { PickedPokemon } from "@/components/cleffa/pickedpokemon"
import { PlayerData } from "@/components/cleffa/settingsview"
import { PokemonModel } from "@/data/pokemon"
import { cn, range } from "@/helpers/utils"

type TeamViewProps = {
  team: PlayerData
  size: number
  models: PokemonModel[]
  align?: "left" | "right"
  onSelectPokemonAction?: (model: PokemonModel) => void
}

export function TeamView({ team, size, models, align, onSelectPokemonAction }: TeamViewProps) {
  let alignClasses: [string, string]
  switch(align) {
    case "left":
      alignClasses = ["", "rotate-180"]
      break
    case "right":
      alignClasses = ["flex-row-reverse", ""]
      break
    default:
      alignClasses = ["", ""]
  }

  function selectPokemon(model: PokemonModel) {
    if (onSelectPokemonAction) {
      onSelectPokemonAction(model)
    }
  }

  return (
    <motion.div
      className={cn("h-full w-full flex gap-1", alignClasses[0])}
      variants={{
        visible: { height: "initial" },
        hidden: { height: 0 },
      }}
      transition={{ duration: 0.4 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {align !== undefined && (
        <div className="flex items-center justify-center">
          <div
            className={cn(
              "h-full p-4 [writing-mode:vertical-lr] text-center text-lg overflow-hidden text-ellipsis whitespace-nowrap text-shadow-md text-shadow-black",
              alignClasses[1]
            )}
            style={{ backgroundColor: team.color }}
          >
            {team.name}
          </div>
        </div>
      )}
      {models.map((pokemon, index) => (
        <PickedPokemon key={index} model={pokemon} align={align} color={team.color} onSelectPokemon={selectPokemon} />
      ))}
      {range(size - models.length).map((_, index) => (
        <motion.div
          key={index}
          className="flex-1 bg-white/10"
          style={{ backgroundColor: index === 0 && team.color ? team.color: undefined }}
          animate={{
            opacity: index === 0 ? [0.3, 0.5, 0.3]: undefined
          }}
          transition={{
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  )
}