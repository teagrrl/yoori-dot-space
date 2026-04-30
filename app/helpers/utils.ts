import clsx, { ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const apiFetcher = (url: string) => fetch(url)
  .then(async (response) => {
    const data = await response.json()
    if(!response.ok) {
      const error = data.error ?? response.status
      return Promise.reject(error)
    }
    return data
  })
  .catch((error) => error)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function range(num: number) {
  return Array.from(Array(num))
}

export function properName(str: string) {
  return str.split("-").map((split) => split[0].toUpperCase() + split.slice(1)).join(" ")
}

export function possessive(str: string) {
  return str + "'" + (str.endsWith("s") ? "" : "s")
}

export function hexToRGBA(color?: string, alpha?: number) {
  if(!color) return color
  if(color.startsWith("#")) {
    color = color.slice(1)
  }
  if(!alpha) { 
    alpha = 0.6
  } else if(alpha > 1) {
    alpha = 1
  } else if(alpha < 0) {
    alpha = 0
  }
  return `rgba(${parseInt(color.slice(0, 2), 16)}, ${parseInt(color.slice(2, 4), 16)}, ${parseInt(color.slice(4), 16)}, ${alpha})`
}

export function UndefinedFilter<T>() {
  return (obj: T | undefined): obj is T => obj !== undefined
}