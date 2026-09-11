"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.default.find().populate('user');
    res.json(activities);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.default.findById(req.params.id).populate('user');
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
});
router.post('/', async (req, res) => {
    const activity = await Activity_1.default.create(req.body);
    res.status(201).json(activity);
});
router.put('/:id', async (req, res) => {
    const activity = await Activity_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    res.json(activity);
});
router.delete('/:id', async (req, res) => {
    const activity = await Activity_1.default.findByIdAndDelete(req.params.id);
    if (!activity)
        return res.status(404).json({ error: 'Activity not found' });
    res.status(204).send();
});
exports.default = router;
