"use client"

import { motion } from "motion/react"
import { Ticker } from "@/components/ticker"
import { cn } from "@/helpers/utils"

const NAME_TICKER = "YOORI • DOT • SPACE •"
const INDULGENT_TICKER = "YOORI • YOORI • YOORI • YOORI • YOOOORI • YOORI • YOORI • YOOORI • YOORI •"
const WELCOME_TICKER = "WELCOME TO MY PERSONAL WEBPAGE •"
const EXPERIENCE_TICKER = "THANK YOU FOR CHOOSING THE YOORI DOT SPACE EXPERIENCE ////"
const LAUGHING_MAN_TICKER = "I THOUGHT WHAT I'D DO WAS PRETEND TO BE ONE OF THOSE DEAF MUTES •"
const CHECKLIST_TICKER = "I RAN OUT OF IDEAS //// TRANS RIGHTS ARE HUMAN RIGHTS //// TODO: REMOVE THIS PLACEHOLDER TEXT //// WHAT IF I PUT THE ENTIRE BEE MOVIE SCRIPT IN HERE ////"
const MISC_TICKER = "I WAS THINKING ABOUT DOING A LITTLE BIT OF USER AGENT SNIFFING AND DOX YOUR INFORMATION IN THIS SECTION OF THE TICKER SO IF YOU SEE THIS IT MEANS I DIDN'T BOTHER"


export function Background() {
  return (
    <motion.div
      className="-z-10 fixed w-full h-full flex flex-col justify-between gap-2 text-white/5 select-none blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackgroundTicker id="name1" direction="left" speed={40} text={NAME_TICKER} />
      <BackgroundTicker id="welcome" direction="right" speed={44} text={WELCOME_TICKER} />
      <BackgroundTicker id="experience" direction="left" speed={53} text={EXPERIENCE_TICKER} />
      <BackgroundTicker id="name2" direction="right" speed={60} text={INDULGENT_TICKER} />
      <BackgroundTicker id="laughingman" direction="left" speed={47} text={LAUGHING_MAN_TICKER} />
      <BackgroundTicker id="checklist" direction="right" speed={39} text={CHECKLIST_TICKER} />
      <BackgroundTicker id="misc" direction="left" speed={50} text={MISC_TICKER} />
      <BackgroundTicker id="name3" direction="right" speed={42} text={NAME_TICKER} />
    </motion.div>
  )
}

type BackgroundTickerProps = {
  className?: string
  id: string
  text: string
  speed: number
  direction: "left" | "right"
}

function BackgroundTicker({ className, id, text, speed, direction }: BackgroundTickerProps) {
  const tickerEls = text.split(/\s+/).map((value, index) => (
    <strong className="mx-2 font-extrabold text-6xl lg:text-8xl" key={index}>{value}</strong>
  ))

  return (
    <Ticker className={cn("w-full whitespace-nowrap", className)} id={id} speed={speed} direction={direction}>{tickerEls}</Ticker>
  )
}