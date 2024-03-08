import express from "express";
import { User } from "../models/user.js";
import { generatePresignedUrls } from "../controllers/imageUrlGenerator.js";

const user_data = express();

user_data.get('/user_data', async (req, res) => {
    const { user_id } = req.query;

    try {
        const preSignedUrls = await generatePresignedUrls(await User.find());

        let user = await User.findById(user_id).select('-password -imageName');

        user = {
            ...user.toObject(),
            imageUrl: preSignedUrls.find(url => url.userId.toString() === user_id)?.imageUrl
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