import express from "express";
import { User } from "../models/user.js";

const change_profile = express();

change_profile.post('/user-edit-profile', async (req, res) => {
    const { firstName, middleName, lastName, username, birthDate, telephone, country, city, bio, role } = req.body;
    try {
        // Check if the new username already exists for any user except the current user
        const userNameExists = await User.findOne({ username, email: { $ne: req.body.email } });

        if (userNameExists) {
            res.json({ success: false, message: 'User name already exists' });
            return;
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { firstName, middleName, lastName, username, role, birthDate, telephone, country, city, bio },
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.json({ success: false, message: 'Error updating user profile' });
    }
});

export default change_profile