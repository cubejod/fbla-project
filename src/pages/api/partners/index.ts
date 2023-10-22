
import { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { withSessionRoute } from '../../../lib/withSession'
import { Partner, Permissions } from '../../../types'
import PermissionsUtil from '../../../utils/PermissionsUtil'


export default withSessionRoute(
  async function handler (req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
      case 'GET': {
        const partnerKeys = await redis.keys('partners.*')
        const partners: Partner[] = []

        for (const key of partnerKeys) {
          const partner = await redis.hgetall(key) as unknown as Partner
          partners.push(partner)
        }

        // TODO: format data when sending JSON
        res.status(200).json(partners)

        break
      }

      case 'POST': {
        if (!PermissionsUtil.hasPermission(req.session, Permissions.CREATE_PARTNERS)) {
          res.status(401).json({ message: 'Unauthenticated' })
          break
        }
        try {
          const partnerData = req.body as Partner
          partnerData.id = Math.max(...(await redis.keys('partners.*')).map(x => parseInt(x.split('.')[ 1 ])), 0) + 1

          // TODO: validate data
          await redis.hset(`partners.${ partnerData.id }`, partnerData)

          res.status(201).json({ message: 'Partner created successfully' })
        } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'An error occurred while creating the partner' })
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