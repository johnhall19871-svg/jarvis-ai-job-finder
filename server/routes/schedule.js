import { Router } from 'express';
import { buildWeeklySchedule } from '../scheduler.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json(buildWeeklySchedule());
});

export default router;
