import { Router } from 'express';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user');
  res.json(activities);
});

router.get('/:id', async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('user');
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.json(activity);
});

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body);
  res.status(201).json(activity);
});

router.put('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.json(activity);
});

router.delete('/:id', async (req, res) => {
  const activity = await Activity.findByIdAndDelete(req.params.id);
  if (!activity) return res.status(404).json({ error: 'Activity not found' });
  res.status(204).send();
});

export default router;
