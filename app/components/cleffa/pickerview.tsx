"use client"

import { motion } from "motion/react"
import { PokemonCard } from "@/components/cleffa/pokemoncard"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Input } from "@/components/ui/input"
import { PokemonModel, SortLabel, sortLabels, StatComparator } from "@/data/pokemon"
import { SettingsData } from "@/components/cleffa/settingsview"

type PickerViewProps = {
  models: PokemonModel[]
  banned: string[]
  picked: string[][]
  settings: SettingsData
  sort?: SortLabel
  filter?: string
  onSelectPokemonAction?: (model: PokemonModel) => void
  onChangeSortAction?: (sort: SortLabel) => void
  onChangeFilterAction?: (filter: string) => void
}

export function PickerView({ models, banned, picked, settings, sort, filter, onSelectPokemonAction, onChangeSortAction, onChangeFilterAction }: PickerViewProps) {
  const filterQuery = (filter ?? "").toLowerCase().replaceAll(/\s/g, "-").trim()
  const filteredModels = filterQuery.length > 0
    ? models.filter((model) => {
      const checkAgainst = [
        model.species.toLowerCase(),
        ...model.types.map((type) => type.toLowerCase()),
        ...model.abilities.map((ability) => ability.toLowerCase()),
        ...model.moves.map((move) => move.toLowerCase()),
      ]
      return checkAgainst.filter((check) => check.includes(filterQuery)).length > 0
    })
    : models
  const sortedModels = sort ? filteredModels.sort(StatComparator(sort.type)) : filteredModels

  function selectRandomPokemon() {
    const unpickedModels = models.filter((model) => ![...banned, ...picked.flat()].includes(model.species))
    console.log([...banned, ...picked.flat()], unpickedModels)
    const model = unpickedModels.length > 0 ? unpickedModels[Math.floor(Math.random() * unpickedModels.length)] : models[Math.floor(Math.random() * models.length)]
    selectPokemon(model)
  }
  
  function getPickColor(name: string) {
    if(banned.includes(name)) return settings.banColor
    const playerIndex = picked.findIndex((picks) => picks.includes(name))
    return playerIndex > -1 ? settings.players[playerIndex].color : undefined
  }

  function selectPokemon(model: PokemonModel) {
    if (onSelectPokemonAction) {
      onSelectPokemonAction(model)
    }
  }

  function changeSort(value: SortLabel | null) {
    if (value && onChangeSortAction) {
      onChangeSortAction(value)
    }
  }

  function onChangeFilter(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChangeFilterAction) {
      onChangeFilterAction(event.target.value)
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-2 overflow-hidden"
      variants={{
        visible: { height: "80%" },
        hidden: { height: "0%" },
      }}
      transition={{ duration: 0.4 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex gap-8 p-2 items-center">
        <div className="flex gap-2 items-center">
          <label>Sort by:</label>
          <Combobox
            items={sortLabels}
            defaultValue={sort ?? sortLabels[0]}
            onValueChange={changeSort}
          >
            <ComboboxInput className="w-48" />
            <ComboboxContent>
              <ComboboxEmpty>No matches</ComboboxEmpty>
              <ComboboxList>
                {(label: SortLabel) => (
                  <ComboboxItem
                    key={label.type}
                    value={label}
                  >
                    {label.label}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="flex gap-2 items-center">
          <label>Filter by:</label>
          <Input
            className="w-48"
            type="text"
            placeholder="Name, ability, move, etc"
            value={filter}
            onChange={onChangeFilter}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 p-1 justify-center overflow-x-hidden overflow-y-auto">
        {settings.allowRandom && !filter && (
          <button
            className="group z-10 group relative flex flex-1 max-w-1/5 min-w-36 min-h-48 justify-center bg-white/10 cursor-pointer"
            onClick={selectRandomPokemon}
          >
            <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden">
              <div className="text-7xl group-hover:scale-125 transition-transform">🎲</div>
              <div className="absolute bottom-1 text-lg font-semibold text-shadow-lg text-shadow-black">Random</div>
              <div className="absolute top-0 right-0 flex flex-wrap justify-end gap-0.5 text-xs">
                <div className="px-2 py-0.5 pkmn-detail bg-type-null text-center">
                  <span>???</span>
                </div>
              </div>
            </div>
          </button>
        )}
        {sortedModels.length > 0 ? (
          sortedModels.map((model) => (
            <PokemonCard
              key={model.name}
              model={model}
              color={getPickColor(model.species)}
              showBadges={settings.showBadges}
              onSelectPokemon={selectPokemon}
            />
          ))
        ) : (
          <div>No matches</div>
        )}
      </div>
    </motion.div>
  )
}