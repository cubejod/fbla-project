import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { withSessionRoute } from '../../../lib/withSession'
import { Permissions, User } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'

export default withSessionRoute(
  async function handler (req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.id) {
      res.status(400).json({ error: 'Bad request' })
      return
    }

    const idStr = `users.${ req.query.id }`

    switch (req.method) {
      case 'PUT': {
        if (
          !PermissionsUtil.hasPermission(req.session, Permissions.EDIT_USERS) &&
          req.session.id != req.query.id as unknown as number
        ) {
          res.status(401).json({ error: 'Unauthenticated' })
          break
        }

        // TODO: validate data
        const userData = req.body as User

        await redis.hset(`users.${ userData.id }`, userData)

        res.status(201).json({ message: 'User edited successfully' })

        break
      }

      case 'DELETE': {
        if (!PermissionsUtil.hasPermission(req.session, Permissions.DELETE_USERS)) {
          res.status(401).json({ error: 'Unauthenticated' })
          break
        }

        if (!await redis.exists(idStr)) {
          res.status(404).json({ error: 'User not found' })
          break
        }

        const user = await redis.hgetall(idStr) as unknown as User
        if (user.id == req.session.id) {
          res.status(403).json({ error: 'You are not allowed to delete your account at this time.' })
          break
        }

        // TODO: Fix this
        await redis.del(idStr)
        res.status(204).end()

        break
      }

      default: {
        res.status(405).json({ message: 'Method not allowed' })
        break
      }
    }
  }
)