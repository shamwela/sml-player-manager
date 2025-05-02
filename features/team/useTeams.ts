import { useLocalStorage } from 'usehooks-ts'

export type Player = {
  id: string
  name: string
}

export type Team = {
  id: string
  name: string
  playerCount: number
  region: string
  country: string
  players: Player[]
}

export const useTeams = () => {
  const [teams, setTeams] = useLocalStorage<Team[]>('teams', [])

  return { teams, setTeams }
}
