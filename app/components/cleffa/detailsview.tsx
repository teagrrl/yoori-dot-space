/* eslint-disable @next/next/no-img-element */

import { motion } from "motion/react"
import { DetailsRadar } from "@/components/cleffa/detailsradar"
import { DetailsStatRow } from "@/components/cleffa/detailsstatrow"
import { SettingsData } from "@/components/cleffa/settingsview"
import { LargeBadges } from "@/components/cleffa/pokemonbadge"
import { PokemonType } from "@/components/cleffa/pokemontype"
import { Button } from "@/components/ui/button"
import { PokemonModel, PokemonPoolStats, PokemonStats } from "@/data/pokemon"
import { possessive, properName } from "@/helpers/utils"

type DetailsViewProps = {
  models: PokemonModel[]
  variant?: number
  banned?: string[]
  picked?: string[][]
  settings: SettingsData
  min?: PokemonStats
  max?: PokemonStats
  stats?: PokemonPoolStats
  onClose?: () => void
  onBan?: (species: string) => void
  onPick?: (player: number, species: string) => void
  onReset?: (species: string) => void
}

export function DetailsView({ models, variant, banned, picked, settings, min, max, stats, onClose, onBan, onPick, onReset }: DetailsViewProps) {
  const model = models[(variant ?? 0) % models.length]
  
  function handleClose() {
    if (onClose) {
      onClose()
    }
  }

  function handleBan(species: string) {
    if (onBan) {
      onBan(species)
    }
 }

  function handlePick(player: number, species: string) {
    if (onPick) {
      onPick(player, species)
    }
  }

  function handleReset(species: string) {
    if (onReset) {
      onReset(species)
    }
  }

  return (
    <motion.div
      className="h-full flex flex-col gap-2 py-1 overflow-hidden"
      variants={{
        visible: { height: "80%" },
        hidden: { height: "0%" },
      }}
      transition={{ duration: 0.4 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="h-full flex gap-4 p-4">
        <div className="h-full flex items-center justify-center border-2 border-foreground rounded-lg bg-white/10">
          <div className="relative max-w-3/4 max-h-3/4">
            <img
              src={model.artwork ?? model.sprite ?? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png"}
              alt={properName(model.name)}
              width="100%"
              height="100%"
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <Button className="hidden" onClick={handleClose}>Hide Details</Button>
            <Button
              className="text-white"
              style={{ backgroundColor: settings.banColor }}
              disabled={!banned || (banned.length >= (settings.bans * settings.players.length)) || banned.includes(model.species)}
              onClick={() => handleBan(model.species)}
            >
              Ban {model.species}
            </Button>
            {settings.players.map((player, index) => (
              <Button
                key={index}
                className="text-white"
                style={{ backgroundColor: player.color }}
                disabled={!picked || (picked[index].length >= settings.picks) || picked[index].includes(model.species)}
                onClick={() => handlePick(index, model.species)}
              >
                {possessive(player.name)} Pick
              </Button>
            ))}
            <Button
              disabled={(banned && !banned.includes(model.species)) && (picked && !picked.flat().includes(model.species))}
              onClick={() => handleReset(model.species)}
            >
              Reset {model.species}
            </Button>
          </div>
          <div className="flex gap-4 items-center justify-center">
            <div className="w-full flex flex-col gap-2 items-center">
              <h4 className="text-4xl font-bold text-center">{properName(model.name)}</h4>
              <div className="flex flex-row justify-center items-center gap-1">
                {model.types.map((type) => <PokemonType key={`${model.name}_${type}`} type={type} />)}
              </div>
              <div className="flex flex-wrap justify-center items-center gap-1 py-4">
                <div className="mr-2">{model.abilities.length > 1 ? "Abilities" : "Ability"}</div>
                {model.abilities.map((ability) => 
                  <div key={`${model.name}_${ability}`} className="px-2 py-0.5 pkmn-detail text-black bg-white">
                    <span>{properName(ability)}</span>
                  </div>
                )}
              </div>
              {settings.showBadges && (
                <LargeBadges model={model} />
              )}
            </div>
            <div className="flex flex-col gap-0.5 justify-center">
              <DetailsStatRow label={"HP"} current={model.stats.hp} min={min?.hp} max={max?.hp} stats={stats?.hp} />
              <DetailsStatRow label={"Attack"} current={model.stats.attack} min={min?.attack} max={max?.attack} stats={stats?.attack} />
              <DetailsStatRow label={"Defense"} current={model.stats.defense} min={min?.defense} max={max?.defense} stats={stats?.defense} />
              <DetailsStatRow label={"Special Attack"} current={model.stats.specialAttack} min={min?.specialAttack} max={max?.specialAttack} stats={stats?.specialAttack} />
              <DetailsStatRow label={"Special Defense"} current={model.stats.specialDefense} min={min?.specialDefense} max={max?.specialDefense} stats={stats?.specialDefense} />
              <DetailsStatRow label={"Speed"} current={model.stats.speed} min={min?.speed} max={max?.speed} stats={stats?.speed} />
              <hr className="border-neutral-400 w-4/5 border-t-2 mx-auto mt-3 mb-1" />
              <DetailsStatRow label={"Base Stat Total"} current={model.baseStatTotal} min={min?.total} max={max?.total} stats={stats?.total} />
              <DetailsStatRow label={"Physical Bulk"} current={model.stats.physicalBulk} min={min?.physicalBulk} max={max?.physicalBulk} stats={stats?.physicalBulk} />
              <DetailsStatRow label={"Special Bulk"} current={model.stats.specialBulk} min={min?.specialBulk} max={max?.specialBulk} stats={stats?.specialBulk} />
            </div>
            <div className="flex items-center justify-center">
              <DetailsRadar stats={model.stats} pool={stats} />
            </div>
          </div>
          <div className="flex-1 flex flex-col overflow-auto text-sm gap-2">
            <div className="text-lg font-semibold px-2">Moveset</div>
            <div className="flex flex-wrap items-center gap-1 px-2">
              {model.moves.map((move) => 
                <div
                  key={`${model.name}_${move}`}
                  className="h-fit p-0.5 px-2 pkmn-detail text-center text-black bg-neutral-100 even:bg-slate-200"
                >
                  <span>{properName(move)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}