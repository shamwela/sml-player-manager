import { useDisclosure } from '../disclosure/useDisclosure'
import Modal from 'react-modal'
import { usePlayers } from '../player/usePlayers'
import { getErrorComponent } from '../error/getErrorComponent'
import { type Team, useTeams } from './useTeams'
import { type FormEvent } from 'react'
import { v4 as uuid } from 'uuid'

export const AddPlayerArea = ({ team }: { team: Team }) => {
  const { isOpened, open, close } = useDisclosure()
  const { isError, error, isLoading, data } = usePlayers()
  const { teams, setTeams } = useTeams()

  if (isError) {
    return getErrorComponent(error)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ teams })
    type Input = {
      player: {
        value: string
      }
    }
    const target = event.target as typeof event.target & Input

    const id = uuid()
    const name = target.player.value
    const player = { id, name }

    // The player must be in no more than one team.
    let isAlreadyInATeam = false
    teams.forEach((team) => {
      team.players.forEach((player) => {
        if (player.name === name) {
          isAlreadyInATeam = true
        }
      })
    })
    if (isAlreadyInATeam) {
      alert(`${name} is already in a team.`)
      return
    }

    const playerCount = team.players.length + 1
    const updatedTeam = {
      ...team,
      players: [...team.players, player],
      playerCount,
    }
    const updatedTeams = teams.map((team) => {
      if (team.id === updatedTeam.id) {
        return updatedTeam
      }
      return team
    })
    setTeams(updatedTeams)
    close()
  }

  return (
    <div>
      <button onClick={open}>Add a player</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <div className='flex flex-col gap-y-4'>
          <h1>Add a player</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
            {isLoading ? (
              <p>Loading players...</p>
            ) : !data ? (
              <p>No players found.</p>
            ) : (
              // I should probably implement pagination and search box here,
              // but just used the first page of the data for demo purposes.
              <div className='flex flex-col gap-y-2'>
                {data.pages[0].data.map(
                  ({ id, first_name, last_name }, index) => {
                    const name = `${first_name} ${last_name}`

                    return (
                      <div
                        key={id}
                        className='flex gap-x-2 cursor-pointer self-start'
                      >
                        <input
                          type='radio'
                          name='player'
                          id={id.toString()}
                          value={name}
                          // Default check the first player.
                          defaultChecked={index === 0}
                        />
                        <label
                          htmlFor={id.toString()}
                          className='cursor-pointer'
                        >
                          {name}
                        </label>
                      </div>
                    )
                  }
                )}
              </div>
            )}

            <div className='flex gap-x-4'>
              <button onClick={close}>Close</button>
              <button type='submit'>Add player</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  )
}
