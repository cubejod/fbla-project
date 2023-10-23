import React, { useState } from 'react'
import { User } from '../../types'

type Props = {
  initialData: User
  onSubmit: (data: User) => void
  onCancel: () => void
}

const UserForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [ userData, setUserData ] = useState(initialData)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [ name ]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(userData)
  }

  return (
    <form onSubmit={ handleSubmit } className="user-form">
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={ userData.username }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={ userData.email }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={ userData.password }
          onChange={ handleInputChange }
          required
        />
      </div>
      <div>
        <label>Permissions:</label>
        <input
          type="number"
          name="permissions"
          value={ userData.permissions }
          onChange={ handleInputChange }
          required
        />
      </div>
      <button className="save-button" type="submit">
        Save
      </button>
      <button className="cancel-button" onClick={ () => onCancel() }>
        Cancel
      </button>
    </form>
  )
}

export default UserForm
