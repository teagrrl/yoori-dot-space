"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "motion/react"

export function CreditsView() {
  
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
      <div className="h-full flex justify-center items-center gap-4 p-4">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Custom Limited Esports for Friendly Amateurs</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-base overflow-auto">
            <p>
              <strong>CLEFFA</strong> is a (non-)competitive Pokémon format that my good friends ducks,
              vinone, TUИ, and valascano started playing because they were making lists of competitively
              terrible Pokémon that they wished to see in battle and the resulting games were fun enough
              to watch and play that we wanted to keep playing. One night, while we were staring at the
              janky Google Sheets pick and ban setup, someone joked, &ldquo;what if we had like one of those
              cool over-the-top esport graphics packages for this?&rdquo; and I thought, &ldquo;sure.&rdquo;
              So I proceded to spent far too many hours of my free time creating this website because I love
              my friends and their great ideas. Anyways, have fun and let me know if you encounter any bugs
              at <a className="underline" href="https://twitter.com/yoorilikeglass" target="_blank" rel="noreferrer">@yoorilikeglass</a>
              {" "}or <a className="underline" href="https://bsky.app/profile/yoori.space" target="_blank" rel="noreferrer">@yoori.space</a>.
            </p>
            <p>This website is powered by <a className="underline" href="https://pokeapi.co/" target="_blank" rel="noreferrer">PokéAPI</a> and <a className="underline" href="https://netlify.com/" target="_blank" rel="noreferrer">Netlify</a>.</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}