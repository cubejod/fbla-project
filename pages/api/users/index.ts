
import { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { withSessionRoute } from '../../../lib/withSession'
import { Permissions, User } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'


export default withSessionRoute(
  async function handler (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case 'GET': {
        // TODO: remove this testing function - OR - format data
        if (!PermissionsUtil.hasPermission(req.session, Permissions.MANAGE_USERS)) {
          res.status(401).json({ message: 'Unauthenticated' })
          break
        }

        const userKeys = await redis.keys('users.*')
        const users: User[] = []

        for (const key of userKeys) {
          const user = await redis.hgetall(key) as unknown as User
          users.push(user)
        }

        res.status(200).json(users)
        break
      }

      case 'POST': {
        if (!PermissionsUtil.hasPermission(req.session, Permissions.CREATE_USERS)) {
          res.status(401).json({ message: 'Unauthenticated' })
          break
        }

        try {
          // TODO: validate data
          const userData = req.body as User

          const currentUsers = await Promise.all((await redis.keys('users.*')).map(async key => await redis.hgetall(key)))
          if (currentUsers.find(x => x.username == userData.username || x.email == userData.email)) {
            res.status(409).json({ message: 'User already exists. Please login.' })
            break
          }

          // TODO: validate this function
          userData.id = Math.max(...(await redis.keys('users.*')).map(x => parseInt(x.split('.')[ 1 ])), 0) + 1

          await redis.hset(`users.${ userData.id }`, userData)

          res.status(201).json({ message: 'User created successfully' })
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'An error occurred while creating the user' })
        }
        break
      }

      default: {
        res.status(405).json({ message: 'Method not allowed' })
        break
      }
    }
  }
)