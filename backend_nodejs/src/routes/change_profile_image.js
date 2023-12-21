import express from "express";
import multer from "multer";
import { User } from "../models/user.js";
import handleImage from "../controllers/handleImage.js";
import { promises as fsPromises } from 'fs';
import path from 'path';

const change_profile_image = express();
const upload = multer();
const __dirname = 'C:\\Users\\HP\\Desktop\\meron\\vscode\\Meroni_blog\\backend_nodejs\\';


change_profile_image.use('/uploads', express.static(path.join(__dirname, 'uploads')));

change_profile_image.post('/user-edit-profile-image', upload.single('image'), async (req, res) => {
    const email = req.body.email;
    try {
        const existingUser = await User.findOne({ email });
        const existingImageUrl = existingUser ? existingUser.imageUrl : null;

        if (existingImageUrl) {
            const parsedUrl = new URL(existingImageUrl);
            const relativePath = decodeURIComponent(parsedUrl.pathname);
            const imagePath = path.join(__dirname, relativePath);
            await fsPromises.unlink(imagePath);
        }
        const imageBuffer = req.file.buffer;

        const imageUrl = await handleImage(imageBuffer);
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { imageUrl },
            { new: true }
        );
        res.json({ success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user profile image:', error);
        res.json({ success: false, message: 'Error updating user profile image' });
    }
});

export default change_profile_image