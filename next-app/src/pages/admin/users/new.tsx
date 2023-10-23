import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import UserForm from '../../../components/Users/UserForm'
import { withSessionSsr } from '../../../lib/withSession'
import { Permissions, User } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'

interface Props { }

const NewUser: React.FC = () => {
  const router = useRouter()

  const handleSubmit = async (data: User) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        router.push('/admin/users')
        alert('Created new user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
    }
  }

  const handleCancel = async () => {
    router.push('/admin/users')
  }

  return (
    <div>
      <h1>Create a New User</h1>
      <UserForm
        initialData={ {
          username: '',
          email: '',
          password: '',
          permissions: 0,
        } as User }
        onSubmit={ handleSubmit }
        onCancel={ handleCancel }
      />
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps ({ req }) {
    if (!req.session.username) return {
      redirect: {
        destination: '/admin/login?redirect=/admin/users/new',
        statusCode: 307
      }
    }

    if (!PermissionsUtil.hasPermission(req.session, Permissions.CREATE_USERS)) return {
      redirect: {
        destination: '/admin',
        statusCode: 307
      }
    }

    return { props: {} }
  } satisfies GetServerSideProps<Props>
)

export default NewUser
