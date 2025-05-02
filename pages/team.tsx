import Head from 'next/head'
import { CreateTeamArea } from '@/features/team/CreateTeamArea'
import { useTeams } from '@/features/team/useTeams'
import { AddPlayerArea } from '@/features/team/AddPlayerArea'
import { UpdateTeamArea } from '@/features/team/UpdateTeamArea'
import { DeleteTeamArea } from '@/features/team/DeleteTeamArea'
import { NavigationBar } from '@/features/navigation/NavigationBar'
import { useEffect, useState } from 'react'

const TeamPage = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { teams, setTeams } = useTeams()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const removePlayer = (teamId: string, playerId: string) => {
    const updatedTeams = teams.map((team) => {
      if (team.id === teamId) {
        const playerCount = team.players.length - 1

        return {
          ...team,
          playerCount,
          players: team.players.filter((player) => player.id !== playerId),
        }
      }
      return team
    })
    setTeams(updatedTeams)
  }

  return (
    <>
      <Head>
        <title>Teams</title>
        <meta name='description' content='Teams' />
      </Head>
      <main className='flex flex-col gap-y-4 p-4'>
        <NavigationBar />
        <h1>Teams</h1>
        <CreateTeamArea />
        {!isMounted ? (
          <p>Loading teams...</p>
        ) : (
          teams.map((team) => (
            <div
              key={team.id}
              className='flex flex-col gap-y-4 border border-black p-4 rounded-md'
            >
              <div className='flex flex-col gap-y-4'>
                <h2>Team Name: {team.name}</h2>
                <p>Player count: {team.playerCount}</p>
                <p>Region: {team.region}</p>
                <p>Country: {team.country}</p>
                <h3>Players</h3>
                <ol className='flex flex-col gap-y-4'>
                  {team.players.map((player) => (
                    <li key={player.id} className='flex gap-x-4 items-center'>
                      <span>{player.name}</span>
                      <button onClick={() => removePlayer(team.id, player.id)}>
                        Remove player
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
              <div className='flex gap-x-4'>
                <AddPlayerArea team={team} />
                <UpdateTeamArea team={team} />
                <DeleteTeamArea id={team.id} name={team.name} />
              </div>
            </div>
          ))
        )}
      </main>
    </>
  )
}

export default TeamPage
