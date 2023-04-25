import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const reviewObject = z.object({
  text: z.string(),
  product: z.string(),
  value: z.number().min(1).max(5),
})