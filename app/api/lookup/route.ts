
import { NextRequest, NextResponse } from "next/server"
import { getPokemonDataByNames } from "@/data/pokeapi"
import { SpeciesComparator, SpeciesModel } from "@/data/pokemon"

export type LookupApiResponse = {
  error?: string
  pokemon?: SpeciesModel[]
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams
  const names = (params.get("names") ?? "").split(",")
  if(names.length) {
    const uniqueNames = new Set(names)
    const resultsMap = await getPokemonDataByNames(Array.from(uniqueNames))
    const results: SpeciesModel[] = []
    const notFound: string[] = []
    Object.keys(resultsMap).map((name) => {
      const result = resultsMap[name]
      if(result) {
        results.push(result)
      } else {
        notFound.push(name)
      }
    })
    const sorted = Array.from(results).sort(SpeciesComparator())
    
    return NextResponse.json(
      {
        pokemon: sorted,
        error: notFound.length
          ? `Failed to find the following inputs: ${notFound.map((name) => name.toLowerCase().replace(/-+/g, " ")).join(", ")}`
          : undefined
        },
      { status: 200 },
    )
  } else {
    return NextResponse.json(
      { error: "Pokemon names are required" },
      { status: 400 },
    )
  }
}