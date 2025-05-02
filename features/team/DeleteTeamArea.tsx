import Modal from 'react-modal'
import { useDisclosure } from '../disclosure/useDisclosure'
import { useTeams } from './useTeams'

type DeleteTeamAreaProps = {
  id: string
  name: string
}

export const DeleteTeamArea = ({ id, name }: DeleteTeamAreaProps) => {
  const { isOpened, open, close } = useDisclosure()
  const { teams, setTeams } = useTeams()

  const handleDelete = () => {
    setTeams(teams.filter((team) => team.id !== id))
    close()
  }

  return (
    <div>
      <button onClick={open}>Delete team</button>
      <Modal isOpen={isOpened} onRequestClose={close} ariaHideApp={false}>
        <div className='flex flex-col gap-y-4'>
          <p>
            Are you sure you want to delete the team <strong>{name}</strong>?
          </p>
          <div className='flex gap-x-4'>
            <button onClick={close}>Cancel</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
