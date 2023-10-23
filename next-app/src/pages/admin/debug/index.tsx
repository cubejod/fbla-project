import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import PartnerComponent from '../../../components/Partners/PartnerComponent'
import UserComponent from '../../../components/Users/UserComponent'
import redis from '../../../lib/redis'
import { withSessionSsr } from '../../../lib/withSession'
import { Permissions, type Partner, type User } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'

type Props = {
  partners: Partner[]
  users: User[]
}

const DebugPage: React.FC<Props> = ({ partners, users }) => {
  const router = useRouter()

  async function handleUserDelete (id: number) {
    try {
      const response = await fetch(`/api/users/${ id }`, {
        method: 'DELETE',
      })

      if (response.status === 204) {
        router.reload()
        alert('Deleted user')
      } else {
        const message = (await response.json()).error
        alert('Failed to delete user: ' + message)
      }
    } catch (error) {
      alert('Error deleting user: ' + error)
    }
  }

  async function handleUserEdit (id: number) {
    router.push(`/admin/users/edit/${ id }`)
  }

  return (
    <div>
      <b>Users</b>
      <div className="users-grid">
        { users.map((user) => (
          <UserComponent
            key={ `user-${ user.id }` }
            user={ user }
            onDelete={ handleUserDelete }
            onEdit={ handleUserEdit }
          />
        )) }
      </div>
      <b>Partners</b>
      <div className="partners-grid">
        { partners.map((partner) => (
          <PartnerComponent
            key={ `partner-${ partner.id }` }
            partner={ partner }
          />
        )) }
      </div>
    </div>
  )
}

export const getServerSideProps = withSessionSsr(
  async function getServersideProps ({ req }) {
    if (!req.session.username) return {
      redirect: {
        destination: '/admin/login?redirect=/admin/debug',
        statusCode: 307
      }
    }
    else if (!PermissionsUtil.hasPermission(req.session, Permissions.FULL_ACCESS)) return {
      redirect: {
        destination: '/admin',
        statusCode: 307
      }
    }

    const partnerKeys = await redis.keys('partners.*')
    const partners: Partner[] = []

    for (const key of partnerKeys) {
      const partner = await redis.hgetall(key) as unknown as Partner
      partners.push(partner)
    }

    const userKeys = await redis.keys('users.*')
    const users: User[] = []

    for (const key of userKeys) {
      const user = await redis.hgetall(key) as unknown as User
      user.permissions = PermissionsUtil.toReadable(user.permissions).join(', ') as unknown as number
      users.push(user)
    }

    return {
      props: {
        partners,
        users
      }
    }
  } satisfies GetServerSideProps<Props>
)

export default DebugPage
