const redis = require('redis');

const redis_client = redis.createClient({url: process.env.REDIS_URL}, {
  retry_strategy: (options) => {
    if (options.attempt > 20) {
      return undefined;
    }
    return 3000;
  },
});

redis_client.on('connect', () => {
  return;
});

redis_client.on('error', (error) => {
  console.log(`Redis server error: ${error}`);
  return;
});

redis_client.connect();

module.exports = {
  redis_client,
};
