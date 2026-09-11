import { Router } from 'express';
import Leaderboard from '../models/Leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const entries = await Leaderboard.find().populate('team').sort({ points: -1 });
  res.json(entries);
});

router.get('/:id', async (req, res) => {
  const entry = await Leaderboard.findById(req.params.id).populate('team');
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.post('/', async (req, res) => {
  const entry = await Leaderboard.create(req.body);
  res.status(201).json(entry);
});

router.put('/:id', async (req, res) => {
  const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.json(entry);
});

router.delete('/:id', async (req, res) => {
  const entry = await Leaderboard.findByIdAndDelete(req.params.id);
  if (!entry) return res.status(404).json({ error: 'Leaderboard entry not found' });
  res.status(204).send();
});

export default router;
