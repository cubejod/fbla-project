
import { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../../lib/redis'
import { Partner } from '../../../types'


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const partnerKeys = await redis.keys(`partners.*`)
      const partners: Partner[] = []

      for (const key of partnerKeys) {
        const partner = await redis.hgetall(key) as unknown as Partner
        partners.push(partner)
      }

      res.status(200).json(partners)

      return

    case "POST":
      try {
        const partnerData = req.body as Partner
        partnerData.id = Math.max(...(await redis.keys('partners.*')).map(x => parseInt(x.split('.')[ 1 ])), 0) + 1

        await redis.hset(`partners.${ partnerData.id }`, partnerData)

        res.status(201).json({ message: 'Partner created successfully' })
      } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'An error occurred while creating the partner' })
      }
      return

    default:
      res.status(405).json({ message: 'Method not allowed' })
  }
}
