import express from "express";
import { User } from "../models/user.js";

const pending_editors = express();

pending_editors.get('/pending', async (req, res) => {
    try {
        const pendingEditors = await User.find({ role: 'Pending' });
        res.json({ pendingEditors });
    } catch (error) {
        console.error('Error fetching pending editors:', error);
    }
});

pending_editors.post('/approve/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndUpdate(userId, { role: 'Editor' });
        res.json({ success: true, message: 'Registration approved, `' + user.firstName + ' ' + user.lastName + '` is now an Editor' });
    } catch (error) {
        console.error('Error approving registration:', error);
    }
});

pending_editors.post('/decline/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndUpdate(userId, { role: 'Reader' });
        res.json({ success: true, message: 'Registration declined, `' + user.firstName + ' ' + user.lastName + '` is now a Reader' });
    } catch (error) {
        console.error('Error declining registration:', error);
    }
});

export default pending_editors;