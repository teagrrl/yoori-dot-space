"use client"

import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { useDebounceValue } from "usehooks-ts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { trainerClasses } from "@/data/trainers"

export const DEFAULT_SETTINGS: SettingsData = {
	names: [], 
	bans: 3, 
	picks: 9, 
	banColor: "#9f0b29", 
	players: [
		{ 
			name: "Player 1", 
			color: "#9d67ad", 
		},
		{ 
			name: "Player 2", 
			color: "#85ab6c", 
		},
		/*{ 
			name: "Player 3", 
			color: "#336699", 
		},
		{ 
			name: "Player 4", 
			color: "#b00b69", 
		},*/
	],
	showMega: false,
	showGmax: false,
  showBadges: true,
  showBans: false,
	allowRandom: true,
}

export type PlayerData = {
  name: string
  color: string
}

export type SettingsData = {
  names: string[]
  bans: number
  picks: number
  banColor: string
  players: PlayerData[]
  showMega: boolean
  showGmax: boolean
  showBadges: boolean
  showBans: boolean
  allowRandom: boolean
}

type SettingsViewProps = {
  data: SettingsData
  onChangeSettingsAction?: (data: SettingsData) => void
}

export function SettingsView({ data, onChangeSettingsAction }: SettingsViewProps) {
  const [pokemonNames, setPokemonNames] = useDebounceValue<string>(data.names.join("\r\n"), 250)
  const [numBans, setNumBans] = useState<number>(data.bans ?? 3)
  const [numPicks, setNumPicks] = useState<number>(data.picks ?? 9)
  const [playerData, setPlayerData] = useState<PlayerData[]>(data.players)
  const [banColor, setBanColor] = useState<string>(data.banColor)
  const [showMega, setShowMega] = useState<boolean>(data.showMega)
  const [showGmax, setShowGmax] = useState<boolean>(data.showGmax)
  const [showBadges, setShowBadges] = useState<boolean>(data.showBadges)
  const [showBans, setShowBans] = useState<boolean>(data.showBans)
  const [allowRandom, setAllowRandom] = useState<boolean>(data.allowRandom)

  useEffect(() => {
    if(onChangeSettingsAction) {
        onChangeSettingsAction({
          names: pokemonNames.split(/\r?\n/).map((name) => name.trim()).filter((name) => name.length > 0), 
          bans: numBans, 
          picks: numPicks,
          banColor: banColor,
          players: playerData,
          showMega: showMega,
          showGmax: showGmax,
          showBadges: showBadges,
          showBans: showBans,
          allowRandom: allowRandom,
      })
    }
  }, [
    onChangeSettingsAction,
    pokemonNames,
    numBans,
    numPicks,
    playerData,
    banColor,
    showMega,
    showGmax,
    showBadges,
    showBans,
    allowRandom
  ])

  function onChangePokemonNames(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setPokemonNames(event.target.value)
  }

  function onChangeNumBans(event: React.ChangeEvent<HTMLInputElement>) {
    setNumBans(parseInt(event.target.value))
  }

  function onChangeNumPicks(event: React.ChangeEvent<HTMLInputElement>) {
    setNumPicks(parseInt(event.target.value))
  }

  function onChangePlayerData(event: React.ChangeEvent<HTMLInputElement>, type: "name" | "color", index: number) {
    updatePlayerData(index, type, event.target.value)
  }

  function onChangeBanColor(event: React.ChangeEvent<HTMLInputElement>) {
    setBanColor(event.target.value)
  }

  function updatePlayerData(index: number, type: "name" | "color", value: string) {
    const updatedData = Array.from(playerData)
    updatedData[index][type] = value
    setPlayerData(updatedData)
  }

  function getRandomTrainerName(index: number) {
    // eslint-disable-next-line react-hooks/purity
    const randomClass = trainerClasses[Math.floor(Math.random() * trainerClasses.length)]
    updatePlayerData(index, "name", randomClass)
  }
  
  return (
    <motion.div
      className="overflow-hidden"
      variants={{
        visible: { height: "80%" },
        hidden: { height: "0%" },
      }}
      transition={{ duration: 0.4 }}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="h-full flex justify-center gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Draftable Pokemon</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col overflow-hidden">
            <Textarea
              className="min-w-80 flex-1 resize-none overflow-auto"
              placeholder="Names of all the Pokemon in the draft pool separated by new lines..."
              defaultValue={pokemonNames}
              onChange={onChangePokemonNames}
            />
          </CardContent>
        </Card>
        <div className="flex flex-col gap-4">
          {playerData.map((data, index) => (
            <Card key={`player_${index}`}>
              <CardContent className="flex flex-col gap-2">
                <label className="font-semibold">Team {index + 1}</label>
                <div className="flex gap-2 items-center">
                  <input
                    className="w-10 h-10 rounded-md"
                    type="color"
                    value={data.color}
                    onChange={(e) => onChangePlayerData(e, "color", index)}
                  />
                  <Input
                    className="w-36"
                    type="text" placeholder="Name of this player..."
                    value={data.name}
                    onChange={(e) => onChangePlayerData(e, "name", index)}
                  />
                  <Button 
                    variant="outline"
                    onClick={() => getRandomTrainerName(index)}
                  >
                    🎲
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="flex flex-col gap-2">
              <div className="flex gap-2 justify-between items-center">
                <label className="font-semibold">Number of Picks</label>
                <Input
                  className="w-20"
                  type="number"
                  placeholder="Number of picks..."
                  value={numPicks}
                  onChange={onChangeNumPicks}
                />
              </div>
              <div className="flex gap-2 justify-between items-center">
                <label className="font-semibold">Number of Bans</label>
                <Input
                  className="w-20"
                  type="number"
                  placeholder="Number of bans..."
                  value={numBans}
                  onChange={onChangeNumBans}
                />
              </div>
              <div className="flex gap-2 justify-between items-center">
                <label className="font-semibold">Ban Color</label>
                <input
                  className="w-12 h-10"
                  type="color"
                  value={banColor}
                  onChange={onChangeBanColor}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <Card>
            <CardContent className="flex flex-col gap-4">
              <div className="flex gap-8 justify-between items-center">
                <label className="font-semibold">Allow Mega Evolutions</label>
                <Switch
                  checked={showMega}
                  onCheckedChange={(checked) => setShowMega(checked)}
                />
              </div>
              <div className="flex gap-8 justify-between items-center">
                <label className="font-semibold">Allow Gigantimax</label>
                <Switch
                  checked={showGmax}
                  onCheckedChange={(checked) => setShowGmax(checked)}
                />
              </div>
              <div className="flex gap-8 justify-between items-center">
                <label className="font-semibold">Show Badges</label>
                <Switch
                  checked={showBadges}
                  onCheckedChange={(checked) => setShowBadges(checked)}
                />
              </div>
              <div className="flex gap-8 justify-between items-center">
                <label className="font-semibold">Display Bans</label>
                <Switch
                  checked={showBans}
                  onCheckedChange={(checked) => setShowBans(checked)}
                />
              </div>
              <div className="flex gap-8 justify-between items-center">
                <label className="font-semibold">Allow Random</label>
                <Switch
                  checked={allowRandom}
                  onCheckedChange={(checked) => setAllowRandom(checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}