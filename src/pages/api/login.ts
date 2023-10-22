import redis from '../../lib/redis'
import { withSessionRoute } from '../../lib/withSession'

export default withSessionRoute(
  async function handler (req, res) {
    switch (req.method) {
      case 'POST': {
        const { email, password } = req.body
        const users = await Promise.all((await redis.keys('users.*')).map(async (k) => redis.hgetall(k)))
        const foundUser = users.find(user => user.email === email)

        if (!foundUser) {
          res.status(404).json({ message: 'User does not exist' })
          break
        }

        if (foundUser.password != password) {
          res.status(400).json({ message: 'Incorrect password' })
          break
        }

        // TODO: fix this
        req.session = { ...foundUser, ...req.session }
        await req.session.save()

        res.status(200).json({ message: 'User found!' })
        break
      }

      default: {
        res.status(405).json({ message: 'Method not allowed' })
        break
      }
    }
  }
)