import React from 'react'
import { User } from '../../types'

type Props = {
  user: User
  onDelete?: (id: number) => void
  onEdit?: (id: number) => void
}

const UserComponent: React.FC<Props> = ({ user, onDelete, onEdit }) => {
  return (
    <div key={ user.id } className="user-rectangle">
      <div>
        <strong>Username:</strong> { user.username }
      </div>
      <div>
        <strong>Email:</strong> { user.email }
      </div>
      <div>
        <strong>Password:</strong> { user.password }
      </div>
      <div>
        <strong>ID:</strong> { user.id }
      </div>
      <div>
        <strong>Permissions:</strong> { user.permissions }
      </div>
      {/* Optionally include buttons */ }
      {
        onEdit
          ? <button className="edit-button" onClick={ (e) => {
            e.preventDefault()
            onEdit(user.id)
          } }>Edit</button>
          : ''
      }
      {
        onDelete
          ? <button className="delete-button" onClick={ (e) => {
            e.preventDefault()
            onDelete(user.id)
          } } >Delete</button>
          : ''
      }
    </div>
  )
}

export default UserComponent
