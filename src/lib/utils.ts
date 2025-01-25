import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nodeMapper: Record<string,string> = {
  Notion:'notionNode',
  Slack:'slackNode',
  Discord:'discordNode',
  'Google Drive':'googleNode'
}
