import express from "express";
import { User } from "../models/user.js";
import { generatePresignedUrl } from "../controllers/imageUrlGenerator.js";

const userImageUrl = express();

userImageUrl.get('/userImageUrl/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const preSignedUrl = await generatePresignedUrl(await User.findById(user_id));

        res.json({ success: true, message: 'User data fetched successfully', preSignedUrl });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: true, message: 'Internal Server Error' });
    }
});

export default userImageUrl