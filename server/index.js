import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import scheduleRouter from './routes/schedule.js';
import { PORT } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/api/schedule', scheduleRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'jarvis-ai-job-finder' });
});

app.listen(PORT, () => {
  console.log(`Jarvis AI Job Finder running at http://localhost:${PORT}`);
});
