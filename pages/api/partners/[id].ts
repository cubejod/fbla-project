import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { Partner } from '../../../types'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const idStr = `partners.${ req.query.id }`

  switch (req.method) {
    case "PUT":
      const partnerData = req.body as Partner

      await redis.hset(idStr, partnerData)

      res.status(201).json({ message: 'Partner Edited successfully' })

      return


    case "DELETE":

      if (!await redis.exists(idStr)) {
        res.status(404).json({ error: 'Partner not found' })
        return
      }

      await redis.del(idStr)
      res.status(204).end()

      return

    case "GET":
      if (!await redis.exists(idStr)) {
        res.status(404).json({ error: 'Partner not found' })
        return
      }

      const partner = await redis.hgetall(idStr) as unknown as Partner

      res.status(200).json(partner)

      return

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
