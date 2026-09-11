"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.default.find().populate('members');
    res.json(teams);
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.default.findById(req.params.id).populate('members');
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    res.json(team);
});
router.post('/', async (req, res) => {
    const team = await Team_1.default.create(req.body);
    res.status(201).json(team);
});
router.put('/:id', async (req, res) => {
    const team = await Team_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    res.json(team);
});
router.delete('/:id', async (req, res) => {
    const team = await Team_1.default.findByIdAndDelete(req.params.id);
    if (!team)
        return res.status(404).json({ error: 'Team not found' });
    res.status(204).send();
});
exports.default = router;
