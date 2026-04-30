"use client"

import { motion } from "motion/react"
import { BannedPokemon } from "@/components/cleffa/bannedpokemon"
import { PokemonModel } from "@/data/pokemon"
import { cn, range } from "@/helpers/utils"

type BansViewProps = {
  models: PokemonModel[]
  size: number
  color?: string
  align?: "left" | "right"
  onSelectPokemonAction?: (model: PokemonModel) => void
}

export function BansView({ models, size, color, align, onSelectPokemonAction }: BansViewProps) {

  function selectPokemon(model: PokemonModel) {
    if (onSelectPokemonAction) {
      onSelectPokemonAction(model)
    }
  }

  return (
    <motion.div
      className={cn("w-full h-full flex gap-2 overflow-hidden", align === "right" ? "flex-row-reverse" : undefined)}
      variants={{
        visible: { height: "100%" },
        hidden: { height: 0 },
      }}
      transition={{ duration: 0.4 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {models.map((model) => (
        <BannedPokemon key={model.species} model={model} color={color} onSelectPokemon={selectPokemon} />
      ))}
      {size > models.length && (
        range(size - models.length).map((_, index) => (
          <motion.div
            key={index}
            className="flex-1 max-w-12 bg-white/10"
            style={{ backgroundColor: index === 0 && color ? color: undefined }}
            animate={{
              opacity: index === 0 ? [0.3, 0.5, 0.3]: undefined
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        ))
      )}
    </motion.div>
  )
}