"use client"

import { AnimatePresence, motion } from "motion/react"
import { useCallback, useState } from "react"
import useSWR from "swr"
import { LookupApiResponse } from "@/api/lookup/route"
import { BansView } from "@/components/cleffa/bansview"
import { DetailsView } from "@/components/cleffa/detailsview"
import { PickerView } from "@/components/cleffa/pickerview"
import { DEFAULT_SETTINGS, SettingsData, SettingsView } from "@/components/cleffa/settingsview"
import { TeamView } from "@/components/cleffa/teamview"
import { Button } from "@/components/ui/button"
import { FormFilter, PokemonModel, PokemonPoolStats, SortLabel, sortLabels, SpeciesModel } from "@/data/pokemon"
import { apiFetcher, UndefinedFilter } from "@/helpers/utils"
import { CreditsView } from "./creditsview"

export function CleffaContent() {
  const [savedSettings, setSavedSettings] = useState<SettingsData>(DEFAULT_SETTINGS)
  const {
    names,
    bans: numBans,
    picks: numPicks,
    banColor,
    players,
    showMega,
    showGmax,
    showBans
  } = savedSettings

  const response = useSWR<LookupApiResponse>(names && names.length > 0 ? `/api/lookup?names=${names.toString()}` : null, apiFetcher)
  const error = response.data?.error
  const models = response.data?.pokemon ?? []
  const hasEnoughModels = models.length >= (numBans + numPicks) * players.length

  const [showError, setShowError] = useState<boolean>(true)
  const [showCredits, setShowCredits] = useState<boolean>(false)
  const [showSettings, setShowSettings] = useState<boolean>(true)
  const [showPicker, setShowPicker] = useState<boolean>(false)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [variantIndex, setVariantIndex] = useState<number>(0)
 
  const [filter, setFilter] = useState<string>("")
  const [sort, setSort] = useState<SortLabel>(sortLabels[0])
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonModel[] | null>(null)
  const [bannedPokemon, setBannedPokemon] = useState<string[]>([])
  const [pickedPokemon, setPickedPokemon] = useState<string[][]>(Array(players.length).fill([]))

  const visibleModels = models.map((model) => filteredPokemonForms(model, variantIndex))
  const bannedModels = bannedPokemon
    .map((pick) => models.find((model) => model.name === pick))
    .filter(UndefinedFilter<SpeciesModel>())
    .map((model) => filteredPokemonForms(model, variantIndex))
  const pickedModels = pickedPokemon
    .map((picks) => picks.map((pick) => models.find((model) => model.name === pick))
    .filter(UndefinedFilter<SpeciesModel>())
    .map((model) => filteredPokemonForms(model, variantIndex))
  )

  const banGroup1 = bannedModels.filter((_, index) => index % 2 === 0)
  const banGroup2 = bannedModels.filter((_, index) => index % 2 === 1)
  const teamGroup1 = players.filter((_, index) => index % 2 === 0)
  const teamGroup2 = players.filter((_, index) => index % 2 === 1)
  const poolStats = getPoolStats(models, showMega, showGmax)
    
	const updateSettings = useCallback((data: SettingsData) => {
    setShowError(true)
		setSavedSettings(data)
	}, [setShowError])

  function filteredPokemonForms(model: SpeciesModel, index: number) {
    const forms = model.data.filter(FormFilter(showMega, showGmax))
    return forms[index % forms.length]
  }

  function toggleDetails() {
    setShowPicker(false)
    setShowCredits(false)
    if (hasEnoughModels) {
      setShowDetails(!showDetails)
      setShowSettings(false)
    } else {
      setShowDetails(false)
    }
  }

  function togglePicker() {
    setShowDetails(false)
    setShowCredits(false)
    if (hasEnoughModels) {
      setShowPicker(!showPicker)
      setShowSettings(false)
    } else {
      setShowPicker(false)
    }
  }

  function toggleSettings() {
    setShowDetails(false)
    setShowPicker(false)
    setShowCredits(false)
    if (hasEnoughModels) {
      setShowSettings(!showSettings)
    } else {
      setShowSettings(true)
    }
  }

  function toggleCredits() {
    setShowDetails(false)
    setShowPicker(false)
    if (hasEnoughModels) {
      setShowCredits(!showCredits)
      setShowSettings(false)
    } else {
      setShowSettings(showCredits)
      setShowCredits(!showCredits)
    }
  }

  function selectPokemon(model: PokemonModel) {
    const foundSpecies = models.find((species) => species.name === model.species)
    if (foundSpecies) {
      const validVariants = foundSpecies.data.filter(FormFilter(showMega, showGmax))
      setSelectedPokemon(validVariants)
      setShowDetails(true)
      setShowPicker(false)
      setShowSettings(false)
    }
  }

  function banPokemon(species: string) {
    if(bannedPokemon.length >= numBans * players.length) {
      alert("You've banned enough Pokemon!")
      return
    }
    if(selectedPokemon) {
      if(!bannedPokemon.includes(species)) {
        setBannedPokemon([...bannedPokemon, species])
      }
      setPickedPokemon(pickedPokemon.map((playerPicks) => playerPicks.filter((name) => species !== name)))
      togglePicker()
    }
  }

  function pickPokemon(player: number, species: string) {
    if(pickedPokemon[player].length >= numPicks) {
      alert(`${players[player].name} has picked enough Pokemon!`)
      return
    }
    if(selectedPokemon) {
      if(bannedPokemon.includes(species)) {
        setBannedPokemon(bannedPokemon.filter((name) => species !== name))
      }
      setPickedPokemon(pickedPokemon.map((playerPicks, index) => {
        if(player === index && !playerPicks.includes(species)) {
          return [...playerPicks, species]
        }
        if(player !== index && playerPicks.includes(species)) {
          return playerPicks.filter((name) => species !== name)
        }
        return playerPicks
      }))
      togglePicker()
    }
  }
  
  function resetPokemon(species: string) {
    if(bannedPokemon.includes(species)) {
      setBannedPokemon(bannedPokemon.filter((name) => species !== name))
    }
    setPickedPokemon(pickedPokemon.map((playerPicks) => playerPicks.filter((name) => species !== name)))
    togglePicker()
  }

  function sortPokemon(newSort: SortLabel) {
    setSort(newSort)
  }

  function filterPokemon(newFilter: string) {
    setFilter(newFilter)
  }

  return (
    <div className="relative h-dvh w-dvw flex flex-col py-2 overflow-hidden">
      <AnimatePresence>
        {error && showError && (
          <motion.div
            key="errors"
            className="bg-red-800 mb-2"
            variants={{
              visible: { height: "initial" },
              hidden: { height: "0px" },
            }}
            transition={{ duration: 0.4 }}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="h-full flex flex-col overflow-hidden">
              <div className="flex justify-between items-center gap-2 p-1 px-2">
                <h2 className="text-xl font-bold">Issues</h2>
                <button
                  className="px-2 font-semibold rounded-sm bg-slate-300/20 hover:bg-slate-300/40 cursor-pointer"
                  onClick={() => setShowError(false)}
                >
                  Dismiss
                </button>
              </div>
              <p className="p-1 px-2 text-sm">{error}</p>
            </div>
          </motion.div>
        )}
        {hasEnoughModels && (
          <div key="team1" className="flex-1 flex min-h-16">
            {teamGroup1.map((team, index) => (
              <TeamView
                key={index}
                team={team}
                models={pickedModels[index * 2]}
                size={numPicks}
                align={index % 2 ? "right" : "left"}
                onSelectPokemonAction={selectPokemon}
              />
            ))}
          </div>
        )}
        {showDetails && selectedPokemon && (
          <DetailsView
            key="details"
            models={selectedPokemon}
            variant={variantIndex}
            banned={bannedPokemon}
            picked={pickedPokemon}
            settings={savedSettings}
            stats={poolStats}
            onClose={toggleDetails}
            onBan={banPokemon}
            onPick={pickPokemon}
            onReset={resetPokemon}
          />
        )}
        {showPicker && (
          <PickerView
            key="picker"
            models={visibleModels}
            banned={bannedPokemon}
            picked={pickedPokemon}
            settings={savedSettings}
            sort={sort}
            filter={filter}
            onSelectPokemonAction={selectPokemon}
            onChangeSortAction={sortPokemon}
            onChangeFilterAction={filterPokemon}
          />
        )}
      </AnimatePresence>
      <div className="min-h-12 flex">
        <div className="flex-1 p-2 flex justify-end">
          <AnimatePresence>
            {hasEnoughModels && showBans && (
              <BansView
                models={banGroup1}
                size={numBans}
                color={banColor}
                align="right"
                onSelectPokemonAction={selectPokemon}
              />
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4 p-4">
          {(showPicker || (showDetails && selectedPokemon && selectedPokemon.length > 1)) && (
            <Button onClick={() => setVariantIndex(variantIndex + 1)}>Cycle Variants</Button>
          )}
          {hasEnoughModels && (
            <>
              <Button onClick={togglePicker}>
                {showPicker ? "Hide" : "Show"} Picker
              </Button>
              {showDetails && (
                <Button onClick={toggleDetails}>
                  Hide Details
                </Button>
              )}
              <Button onClick={toggleSettings}>
                {showSettings ? "Hide" : "Change"} Settings
              </Button>
            </>
          )}
          <Button onClick={toggleCredits}>?</Button>
        </div>
        <div className="flex-1 p-2">
          <AnimatePresence>
            {hasEnoughModels && showBans && (
              <BansView
                models={banGroup2}
                size={numBans}
                color={banColor}
                align="left"
                onSelectPokemonAction={selectPokemon}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {showSettings && (
          <SettingsView
            key="settings"
            data={savedSettings}
            onChangeSettingsAction={updateSettings}
          />
        )}
        {showCredits && (
          <CreditsView key="credits" />
        )}
        {hasEnoughModels && (
          <div key="team2" className="flex-1 flex min-h-16">
            {teamGroup2.map((team, index) => (
              <TeamView
                key={index}
                team={team}
                models={pickedModels[index * 2 + 1]}
                size={numPicks}
                align={index % 2 ? "left" : "right"}
                onSelectPokemonAction={selectPokemon}
              />
            ))}
          </div>
        )}
        </AnimatePresence>
    </div>
  )
}

function getPoolStats(models: SpeciesModel[], showMega?: boolean, showGmax?: boolean) {
  const statNames = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed", "physicalBulk", "specialBulk"] as const
  const poolStatNames = [...statNames, "total"]
  const poolSortDesc = (n: number, m: number) => m - n
  const poolStats = models
    .map((model) => model.data).flat()
    .filter(FormFilter(showMega, showGmax))
    .reduce((stats, model) => {
      for(const name of statNames) {
        stats[name].push(model.stats[name])
      }
      stats.total.push(model.baseStatTotal)
      return stats
    }, Object.fromEntries(poolStatNames.map((name) => [name, [] as number[]])))
  for(const name of poolStatNames) {
    poolStats[name].sort(poolSortDesc)
  }
  return poolStats as PokemonPoolStats
}