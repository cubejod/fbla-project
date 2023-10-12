/**
 * @type {import('ioredis').RedisOptions} Options
 */
module.exports.redisConfig = {}

/**
 * @type {import('./types').User}
 */
module.exports.firstUser = {
  username: 'admin',
  email: 'admin@localhost',
  password: 'password',
  id: 0,
  permissions: 511 // All permissions
}
