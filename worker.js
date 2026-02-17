// worker.js
const { Worker } = require('bullmq');
const { connection } = require('./queue');

console.log('👷 Worker started...');

const worker = new Worker(
  'deployment-queue',
  async job => {
    console.log(`🚀 Processing Job ${job.id}`);
    console.log('Job Name:', job.name);
    console.log('Data:', job.data);

    // Simulate deployment work
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('✅ Job completed:', job.id);
  },
  { connection }
);

worker.on('completed', job => {
  console.log(`🎉 Job ${job.id} finished successfully`);
});

worker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

/* ==================================
   Graceful shutdown (Important ECS)
================================== */
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received. Closing worker...');
  await worker.close();
  process.exit(0);
});
