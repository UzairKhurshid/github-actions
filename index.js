const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/api/webhook', (req, res) => {
  console.log(req.headers);
  console.log(req.body);
  res.json({
    message: 'Webhook Received',
    success: true,
  });
});

app.get('/health', (req, res) => {
  console.log('--------------------------------');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.get('/test', (req, res) => {
  console.log('-test')
  console.log('-test')
  console.log('-test')
  res.json({
    message: 'Test endpoint is working',
    success: true,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
