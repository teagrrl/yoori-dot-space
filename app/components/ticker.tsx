"use client"

import { cn } from "@/helpers/utils"
import React, { ReactNode } from "react"
import { motion } from "motion/react"

interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: ReactNode[]
  speed?: number
  direction: "left" | "right"
}

export function Ticker({ id, className, children, speed = 100, direction = "left", ...props }: TickerProps) {
  const tickerRef = React.useRef<HTMLDivElement>(null)
  const [tickerWidth, setTickerWidth] = React.useState<number | null>(0)
  const [addlElements, setAddlElements] = React.useState<number>(1)
  const directionValues = tickerWidth 
    ? direction === "left"
      ? [0, -tickerWidth]
      : [-tickerWidth, 0]
    : 0

  React.useEffect(() => {
    let contentWidth = 0

    for (let index = 0; index < children.length; index++) {
      const elementWidth = document.getElementById(`ticker_${id}_${index}`)?.clientWidth
      if (elementWidth) {
        contentWidth += elementWidth
      }
    }

    setTickerWidth(contentWidth)
  }, [children.length, id])

  React.useEffect(() => {
    if (tickerRef.current && tickerWidth) {
      let elementsToAdd = 0
      let dupeIndex = 0
      let withDupeWidth = 0
      while (withDupeWidth < tickerRef.current.clientWidth) {
        if (dupeIndex >= children.length) dupeIndex = 0 
        const elementWidth = document.getElementById(`ticker_${id}_${dupeIndex}`)?.clientWidth
        if (!elementWidth) break
        withDupeWidth += elementWidth
        dupeIndex++
        elementsToAdd++
      }
      setAddlElements(elementsToAdd + 1)
    }
  }, [children, id, tickerWidth])

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden"
      ref={tickerRef}
      {...props}
    >
      <motion.div
        className={cn("flex", className)}
        animate={{ x: directionValues }}
        transition={{
          ease: 'linear',
          duration: tickerWidth ? tickerWidth / speed : 0,
          repeat: Infinity,
        }}
      >
        {children.map((item, index) => (
          <div key={index} id={`ticker_${id}_${index}`}>
            {item}
          </div>
        ))}
        {[...Array(addlElements)].map((_, index) =>
          <div key={`dupe_${index}`}>
            {children[index % children.length]}
          </div>
        )}
      </motion.div>
    </div>
  )
}