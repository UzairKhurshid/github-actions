// queue.js
const { Queue } = require('bullmq');

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT || 6379,
};

const deploymentQueue = new Queue('deployment-queue', {
  connection,
});

module.exports = {
  deploymentQueue,
  connection,
};
