"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.default.find().populate('team');
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await User_1.default.findById(req.params.id).populate('team');
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
router.post('/', async (req, res) => {
    const user = await User_1.default.create(req.body);
    res.status(201).json(user);
});
router.put('/:id', async (req, res) => {
    const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
router.delete('/:id', async (req, res) => {
    const user = await User_1.default.findByIdAndDelete(req.params.id);
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
});
exports.default = router;
