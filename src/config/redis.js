const redis = require("redis")
const { promisify } = require("util")

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

module.exports = {
    redisGetAsync,
    redisSetAsync
}