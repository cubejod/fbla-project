import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { withSessionRoute } from '../../../lib/withSession'
import { Partner, Permissions } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'

export default withSessionRoute(
  async function handler (req: NextApiRequest, res: NextApiResponse) {
    const idStr = `partners.${ req.query.id }`

    switch (req.method) {
      case 'PUT': {
        if (!PermissionsUtil.hasPermission(req.session, Permissions.EDIT_PARTNERS)) {
          res.status(401).json({ message: 'Unauthorized' })
          break
        }

        const partnerData = req.body as Partner

        // TODO: validate data
        await redis.hset(idStr, partnerData)

        res.status(201).json({ message: 'Partner Edited successfully' })

        break
      }


      case 'DELETE': {
        if (!PermissionsUtil.hasPermission(req.session, Permissions.DELETE_PARTNERS)) {
          res.status(401).json({ message: 'Unauthenticated' })
          break
        }

        if (!await redis.exists(idStr)) {
          res.status(404).json({ error: 'Partner not found' })
          break
        }

        await redis.del(idStr)
        res.status(204).end()

        break
      }

      case 'GET': {
        if (!await redis.exists(idStr)) {
          res.status(404).json({ error: 'Partner not found' })
          break
        }

        const partner = await redis.hgetall(idStr) as unknown as Partner

        // TODO: format data and send as JSON
        res.status(200).json(partner)

        break
      }

      default: {
        res.status(405).json({ message: 'Method not allowed' })
        break
      }
    }
  }
)