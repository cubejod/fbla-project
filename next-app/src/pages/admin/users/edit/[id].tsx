import { useRouter } from 'next/router'
import UserForm from '../../../../components/Users/UserForm'
import redis from '../../../../lib/redis'
import { withSessionSsr } from '../../../../lib/withSession'
import { Permissions, User } from '../../../../types'
import PermissionsUtil from '../../../../utils/PermissionsUtil'

type Props = {
  user: User
}

const EditUser: React.FC<Props> = ({ user }) => {
  const router = useRouter()

  const handleSubmit = async (data: User) => {
    try {
      const response = await fetch(`/api/users/${ data.id }`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) router.push('/admin/users')
    } catch (error) {
      console.error('Error editing user:', error)
    }
  }

  const handleCancel = () => {
    router.push('/admin/users')
  }

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm
        initialData={ user }
        onSubmit={ handleSubmit }
        onCancel={ handleCancel }
      />
    </div>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  if (!req.session.username) return {
    redirect: {
      destination: `/admin/login?redirect=/admin/users/edit/${ query.id }`,
      statusCode: 302
    }
  }
  else if (
    !PermissionsUtil.hasPermission(req.session, Permissions.EDIT_USERS) &&
    req.session.id != query.id as unknown as number
  ) return {
    redirect: {
      destination: '/admin/users',
      statusCode: 302
    }
  }

  const user = (await redis.hgetall(`users.${ query.id }`)) as unknown as User
  return { props: { user } }
})

export default EditUser
