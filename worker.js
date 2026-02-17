const { Worker, Queue } = require('bullmq');
const { connection } = require('./queue');

const deploymentQueue = new Queue('deployment-queue', { connection });

console.log('👷 Worker started...');

const worker = new Worker(
  'deployment-queue',
  async job => {
    console.log(`🚀 Processing Job ${job.id}`);
    console.log('Job Name:', job.name);
    console.log('Data:', job.data);

    if (job.name === 'run-deployment') {
        // Check queue counts
        const counts = await deploymentQueue.getJobCounts('waiting', 'active');
        const waiting = counts.waiting || 0;
        const active = counts.active || 0;

        console.log(`🔹 Queue status - Waiting: ${waiting}, Active: ${active}`);

        if (waiting + active > 1) {
          console.log('--------------------------------!DEPLOYMENT RE-ADDED')  
          // There are other jobs waiting → re-add same job at the end
          console.log('⚠️ Queue not empty, re-adding deployment job...for 20 seconds');
          await deploymentQueue.add('run-deployment', job.data, { delay: 20000 });
          return;
        } else {
          console.log('--------------------------------@DEPLOYMENT COMPLETED');
          // Queue empty (no other jobs waiting)
          console.log('✅ Queue is empty, running deployment now...');
          // Simulate deployment work
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log('🎉 Deployment job completed successfully');
        }
    } else {
      // For any other job type, just process normally
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('✅ Job completed:', job.id);
    }
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
