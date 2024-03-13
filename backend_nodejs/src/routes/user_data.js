import express from "express";
import { User } from "../models/user.js";
import { generatePresignedUrl } from "../controllers/imageUrlGenerator.js";

const user_data = express();

user_data.get('/user_data', async (req, res) => {
    const { user_id } = req.query;

    try {
        const preSignedUrl = await generatePresignedUrl(await User.findById(user_id));

        let user = await User.findById(user_id).select('-password -imageName');

        user = {
            ...user.toObject(),
            imageUrl: preSignedUrl.imageUrl
        }

        if (!user) {
            return res.status(404).json({ error: true, message: 'User not found' });
        }

        // Send user data as JSON response
        res.json({ success: true, message: 'User data fetched successfully', user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

export default user_data