import Modal from 'react-modal'
import { useDisclosure } from '../disclosure/useDisclosure'
import { type FormEvent, useState } from 'react'
import { useTeams } from './useTeams'
import { v4 as uuid } from 'uuid'
import { Error } from '../error/Error'
import { getTeamFormValues } from './getTeamFromValues'

export const CreateTeamArea = () => {
  const { isOpened, open, close } = useDisclosure()
  const { teams, setTeams } = useTeams()
  const [nameError, setNameError] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { name, playerCount, region, country } = getTeamFormValues(event)
    const names = teams.map((team) => team.name)
    let alreadyExists = false
    for (const existingName of names) {
      // Should ignore case when comparing.
      if (existingName.trim().toLowerCase() === name.trim().toLowerCase()) {
        alreadyExists = true
        break
      }
    }
    if (alreadyExists) {
      setNameError('A team with that name already exists.')
      return
    }

    const id = uuid()
    const newTeam = { id, name, playerCount, region, country, players: [] }
    const newTeams = [...teams, newTeam]
    setTeams(newTeams)
    close()
  }

  return (
    <div>
      <button onClick={open}>Create a new team</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-y-4 max-w-1/3'
        >
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='name'>Name</label>
            <input
              name='name'
              id='name'
              type='text'
              autoComplete='off'
              required
              aria-required
            />
            {nameError && <Error message={nameError} />}
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='playerCount'>Player count</label>
            <input
              name='playerCount'
              id='playerCount'
              type='number'
              min={0}
              required
              aria-required
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='region'>Region</label>
            <input
              name='region'
              id='region'
              type='text'
              autoComplete='off'
              required
              aria-required
            />
          </div>

          <div className='flex flex-col gap-y-2'>
            <label htmlFor='country'>Country</label>
            <input
              name='country'
              id='country'
              type='text'
              autoComplete='off'
              required
              aria-required
            />
          </div>

          <button type='submit' className='self-start'>
            Create a new team
          </button>
        </form>
        <button
          onClick={() => {
            setNameError(null)
            close()
          }}
          className='mt-4'
        >
          Close
        </button>
      </Modal>
    </div>
  )
}
