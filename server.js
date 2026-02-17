// server.js
const express = require('express');
const { deploymentQueue } = require('./queue');

const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

/* =====================================
   📊 BULL BOARD SETUP
===================================== */
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

/* =====================================
   📊 BULL BOARD UI
===================================== */
createBullBoard({
  queues: [new BullMQAdapter(deploymentQueue)],
  serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());

/* ================================
   🚀 WEBHOOK
================================ */
app.post('/api/webhook', async(req, res) => {
  // console.log(req.headers);
  // console.log(req.body);
  let data = {
    ref: 'refs/heads/main',
    before: '79c7c27be6199dde7805f6e75a177d47ce1dee25',
    after: '29580f597aed045aa1ab8f558e416e1771555949',
    repository: {
      id: 1153492837,
      node_id: 'R_kgDORMDnZQ',
      name: 'github-actions',
      full_name: 'UzairKhurshid/github-actions',
      private: false,
      owner: {
        name: 'UzairKhurshid',
        email: '43499259+UzairKhurshid@users.noreply.github.com',
        login: 'UzairKhurshid',
        id: 43499259,
        node_id: 'MDQ6VXNlcjQzNDk5MjU5',
        avatar_url: 'https://avatars.githubusercontent.com/u/43499259?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/UzairKhurshid',
        html_url: 'https://github.com/UzairKhurshid',
        followers_url: 'https://api.github.com/users/UzairKhurshid/followers',
        following_url: 'https://api.github.com/users/UzairKhurshid/following{/other_user}',
        gists_url: 'https://api.github.com/users/UzairKhurshid/gists{/gist_id}',
        starred_url: 'https://api.github.com/users/UzairKhurshid/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/UzairKhurshid/subscriptions',
        organizations_url: 'https://api.github.com/users/UzairKhurshid/orgs',
        repos_url: 'https://api.github.com/users/UzairKhurshid/repos',
        events_url: 'https://api.github.com/users/UzairKhurshid/events{/privacy}',
        received_events_url: 'https://api.github.com/users/UzairKhurshid/received_events',
        type: 'User',
        user_view_type: 'public',
        site_admin: false
      },
      html_url: 'https://github.com/UzairKhurshid/github-actions',
      description: null,
      fork: false,
      url: 'https://api.github.com/repos/UzairKhurshid/github-actions',
      forks_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/forks',
      keys_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/keys{/key_id}',
      collaborators_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/collaborators{/collaborator}',
      teams_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/teams',
      hooks_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/hooks',
      issue_events_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/issues/events{/number}',
      events_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/events',
      assignees_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/assignees{/user}',
      branches_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/branches{/branch}',
      tags_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/tags',
      blobs_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/git/blobs{/sha}',
      git_tags_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/git/tags{/sha}',
      git_refs_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/git/refs{/sha}',
      trees_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/git/trees{/sha}',
      statuses_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/statuses/{sha}',
      languages_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/languages',
      stargazers_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/stargazers',
      contributors_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/contributors',
      subscribers_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/subscribers',
      subscription_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/subscription',
      commits_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/commits{/sha}',
      git_commits_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/git/commits{/sha}',
      comments_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/comments{/number}',
      issue_comment_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/issues/comments{/number}',
      contents_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/contents/{+path}',
      compare_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/compare/{base}...{head}',
      merges_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/merges',
      archive_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/{archive_format}{/ref}',
      downloads_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/downloads',
      issues_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/issues{/number}',
      pulls_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/pulls{/number}',
      milestones_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/milestones{/number}',
      notifications_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/notifications{?since,all,participating}',
      labels_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/labels{/name}',
      releases_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/releases{/id}',
      deployments_url: 'https://api.github.com/repos/UzairKhurshid/github-actions/deployments',
      created_at: 1770635479,
      updated_at: '2026-02-17T11:31:26Z',
      pushed_at: 1771327977,
      git_url: 'git://github.com/UzairKhurshid/github-actions.git',
      ssh_url: 'git@github.com:UzairKhurshid/github-actions.git',
      clone_url: 'https://github.com/UzairKhurshid/github-actions.git',
      svn_url: 'https://github.com/UzairKhurshid/github-actions',
      homepage: null,
      size: 8,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      has_discussions: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      allow_forking: true,
      is_template: false,
      web_commit_signoff_required: false,
      has_pull_requests: true,
      pull_request_creation_policy: 'all',
      topics: [],
      visibility: 'public',
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'main',
      stargazers: 0,
      master_branch: 'main'
    },
    pusher: {
      name: 'UzairKhurshid',
      email: '43499259+UzairKhurshid@users.noreply.github.com'
    },
    forced: false,
    sender: {
      login: 'UzairKhurshid',
      id: 43499259,
      node_id: 'MDQ6VXNlcjQzNDk5MjU5',
      avatar_url: 'https://avatars.githubusercontent.com/u/43499259?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/UzairKhurshid',
      html_url: 'https://github.com/UzairKhurshid',
      followers_url: 'https://api.github.com/users/UzairKhurshid/followers',
      following_url: 'https://api.github.com/users/UzairKhurshid/following{/other_user}',
      gists_url: 'https://api.github.com/users/UzairKhurshid/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/UzairKhurshid/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/UzairKhurshid/subscriptions',
      organizations_url: 'https://api.github.com/users/UzairKhurshid/orgs',
      repos_url: 'https://api.github.com/users/UzairKhurshid/repos',
      events_url: 'https://api.github.com/users/UzairKhurshid/events{/privacy}',
      received_events_url: 'https://api.github.com/users/UzairKhurshid/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false
    },
    created: false,
    deleted: false,
    base_ref: null,
    compare: 'https://github.com/UzairKhurshid/github-actions/compare/79c7c27be619...29580f597aed',
    commits: [
      {
        id: '29580f597aed045aa1ab8f558e416e1771555949',
        tree_id: 'e25e4248f65af5ac44f2286d0b5f2078d17ddda7',
        distinct: true,
        message: 'log pushed in main branch',
        timestamp: '2026-02-17T16:32:53+05:00',
        url: 'https://github.com/UzairKhurshid/github-actions/commit/29580f597aed045aa1ab8f558e416e1771555949',
        author: [Object],
        committer: [Object],
        added: [],
        removed: [],
        modified: [Array]
      }
    ],
    head_commit: {
      id: '29580f597aed045aa1ab8f558e416e1771555949',
      tree_id: 'e25e4248f65af5ac44f2286d0b5f2078d17ddda7',
      distinct: true,
      message: 'log pushed in main branch',
      timestamp: '2026-02-17T16:32:53+05:00',
      url: 'https://github.com/UzairKhurshid/github-actions/commit/29580f597aed045aa1ab8f558e416e1771555949',
      author: {
        name: 'Uzair Khurshid',
        email: 'uzairkhurshid@Uzairs-MacBook-Pro.local',
        date: '2026-02-17T16:32:53+05:00'
      },
      committer: {
        name: 'Uzair Khurshid',
        email: 'uzairkhurshid@Uzairs-MacBook-Pro.local',
        date: '2026-02-17T16:32:53+05:00'
      },
      added: [],
      removed: [],
      modified: [ 'index.js' ]
    }
  }
  const event = req.headers['x-github-event'];
  if (event === 'push') {
    const branch = req.body.ref;

    if (event === 'push' && req.body.ref === 'refs/heads/main') {
      console.log("🚀 Code reached main branch");

      const message = req.body.head_commit.message;

      if (message.startsWith("Merge pull request")) {
        console.log("🔥 It was a PR merge");
      } else {
        console.log("✏️ Direct push to main");
      }

      const existingDeploymentJobs = await deploymentQueue.getJobs(
        ['waiting', 'active', 'delayed']
      );

      const hasDeploymentJob = existingDeploymentJobs.some(job => job.name === 'run-deployment');

      if (hasDeploymentJob) {
        console.log("⚠️ run-deployment job already exists in queue. Skipping adding a new one.");
      } else{
        // Add deployment job with 10s delay
        await deploymentQueue.add(
          'run-deployment',            // job name
          {
            event,
            branch: 'main',
            message,
            timestamp: new Date().toISOString(),
          },
          {
            delay: 10000               // 10 seconds delay
          }
        );
        console.log("📦 Deployment job queued with 10s delay");
      }
    }

    // 🔹 Handle PR merged explicitly
    if (event === 'pull_request') {
        if (
            req.body.action === 'closed' &&
            req.body.pull_request.merged &&
            req.body.pull_request.base.ref === 'main'
        ) {
            console.log("🔥 PR merged into main (from pull_request event)");
        }
    }

  }
  res.json({
    message: 'Webhook Received',
    success: true,
  });
});

/* ================================
   🟢 HEALTH
================================ */
app.get('/health', (req, res) => {
  console.log('Health check');
  console.log('Health check');
  console.log('Health check');
  res.json({
    status: 'okk',
    uptime: process.uptime(),
  });
});

/* ================================
   🚀 SERVER START
================================ */
app.listen(PORT, async () => {
  console.log(`API running on port ${PORT}`);

  // 🔥 Add 10 startup jobs
  console.log('📦 Adding 10 startup jobs...');

  for (let i = 1; i <= 10; i++) {
    await deploymentQueue.add('startup-job', {
      number: i,
      createdAt: new Date().toISOString(),
    });
  }

  console.log('✅ Startup jobs added');
});
