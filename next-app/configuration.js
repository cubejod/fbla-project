/**
 * @type {import('ioredis').RedisOptions} Options
 */
module.exports.redisConfig = {
  port: 6379,
  host: 'redis-server'
}

/**
 * @type {import('./src/types').User}
 */
module.exports.firstUser = {
  username: 'admin',
  email: 'admin@localhost',
  password: 'password',
  id: 0,
  permissions: 511 // All permissions
}
