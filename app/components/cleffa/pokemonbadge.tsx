
import { PokemonModel } from "@/data/pokemon"

type PokemonBadgesProps = {
  model: PokemonModel
}

export function SmallBadges({ model }: PokemonBadgesProps) {
  return (
    <div className="flex flex-col gap-0.5">
      {model.badges.map((badge) => 
        <div key={`${model.name}_${badge}`} className="p-0.5 pkmn-detail bg-white/50" title={getBadgeMeaning(badge)}>
          <span>{getBadgeIcon(badge)}</span>
        </div>
      )}
    </div>
  )
}

export function LargeBadges({ model }: PokemonBadgesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-0.5">
      <div className="mr-2">Badges</div>
      {model.badges.map((badge) => 
        <div key={`${model.name}_${badge}`} className="flex gap-1 p-2 py-1 pkmn-detail bg-white/50">
          <span>{getBadgeIcon(badge)}</span>
          <span>{getBadgeMeaning(badge)}</span>
        </div>
      )}
    </div>
  )
}

export function getBadgeMeaning(badge: string) {
  switch(badge) {
    case "def3":
      return "Physically Bulky"
    case "def4":
      return "Physical Wall"
    case "def5":
      return "Physically Unkillable"
    case "spdef3":
      return "Specially Bulky"
    case "spdef4":
      return "Special Wall"
    case "spdef5":
      return "Specially Unkillable"
    case "hazards":
      return "Can set hazards"
    case "spinner":
      return "Can remove hazards"
    case "weather":
      return "Can use weather"
    default:
        return badge
  }
}

export function getBadgeIcon(badge: string) {
  switch(badge) {
    case "def3":
    case "def4":
    case "def5":
      return "🛡️"
    case "spdef3":
    case "spdef4":
    case "spdef5":
      return "🦺"
    case "hazards":
      return "⚠️"
    case "spinner":
      return "🌀"
    case "weather":
      return "🌦️"
    default:
      return "❓"
  }
}