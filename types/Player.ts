import { type Team } from './Team'

export type Player = {
  id: number
  first_name: string
  last_name: string
  position: string
  height: number
  weight: number
  team: Team
}
