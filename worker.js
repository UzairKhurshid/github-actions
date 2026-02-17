const { Worker, Queue } = require('bullmq');
const { connection } = require('./queue');
const axios = require('axios');

const deploymentQueue = new Queue('deployment-queue', { connection });
console.log('👷 Worker started...');

const GITHUB_OWNER = 'UzairKhurshid'; // your GitHub username/org
const GITHUB_REPO = 'github-actions'; // repo with workflow
const WORKFLOW_FILE = 'deploy.yml';   // workflow file name
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // PAT token with repo + workflow permissions


const worker = new Worker(
  'deployment-queue',
  async job => {
    console.log(`🚀 Processing Job ${job.id}`);
    console.log('Job Name:', job.name);
    console.log('Data:', job.data);

    if (job.name === 'run-deployment') {
        // Check queue counts
        const counts = await deploymentQueue.getJobCounts('waiting', 'active', 'delayed');
        const waiting = counts.waiting || 0;
        const active = counts.active || 0;
        const delayed = counts.delayed || 0;
        
        console.log(`🔹 Queue status - Waiting: ${waiting}, Active: ${active}`);

        if (waiting + active + delayed > 1) {
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
          try {
            const response = await axios.post(
              `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
              {
                ref: 'main',         // branch to run workflow on
                inputs: {            // optional workflow inputs
                  TEST_RUN: 'false'
                }
              },
              {
                headers: {
                  'Accept': 'application/vnd.github+json',
                  'Authorization': `Bearer ${GITHUB_TOKEN}`,
                }
              }
            );
          
            console.log('✅ GitHub Actions workflow triggered successfully!');
          } catch (err) {
            if (err.response) {
              console.error('❌ Failed to trigger workflow:', err.response.data);
            } else {
              console.error('❌ Error triggering GitHub workflow:', err.message);
            }
          }
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
