const { createClient } = require("redis");

const client = (async () => {
  const client = createClient();

  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  return client;
})();

module.exports = client;