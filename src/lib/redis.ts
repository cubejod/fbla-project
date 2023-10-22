import Redis from 'ioredis'

import { redisConfig } from '../../configuration'

const redis = new Redis(redisConfig)

export default redis