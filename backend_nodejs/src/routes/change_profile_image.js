import express from "express";
import multer from "multer";
import { User } from "../models/user.js";
import { S3Client, DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import sharp from 'sharp';
import { generatePresignedUrls } from '../controllers/imageUrlGenerator.js';
import { config as configDotenv } from "dotenv";

configDotenv();

const change_profile_image = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const BUCKET_NAME = process.env.BUCKET_NAME;
const BUCKET_REGION = process.env.BUCKET_REGION;
const ACCESS_KEY_ID = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

change_profile_image.post('/user-edit-profile-image', upload.single('image'), async (req, res) => {
    const email = req.body.email;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        try {
            // Delete existing image from S3 bucket
            const deleteParams = {
                Bucket: BUCKET_NAME,
                Key: existingUser.imageName
            };
            const deleteCommand = new DeleteObjectCommand(deleteParams);
            await s3.send(deleteCommand);

            console.log('Image deleted successfully from S3');
        } catch (error) {
            console.error('Error deleting image in s3 bucket:', error);
            res.status(500).json({ success: false, message: 'Error deleting image in s3 bucket' });
        }


        // Update user in the database to remove imageName
        try {
            existingUser.imageName = ""; // Set imageName to undefined or null
            await existingUser.save();

            console.log('User imageName updated to null successfully to database');
        } catch (error) {
            console.error('Error updating user profile image to null:', error);
            res.status(500).json({ success: false, message: 'Error updating user profile image' });
        }

        // Generate a new random image name
        const newImageName = randomImageName();

        try {
            const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200, fit: 'cover' }).toBuffer();

            const uploadParams = {
                Bucket: BUCKET_NAME,
                Key: newImageName,
                Body: buffer,
                ContentType: req.file.mimetype
            };
            const uploadCommand = new PutObjectCommand(uploadParams);
            await s3.send(uploadCommand);

            console.log('Image uploaded successfully to S3');
        } catch (error) {
            console.error('Error uploading image to S3:', error);
            res.status(500).json({ success: false, message: 'Error uploading image to S3' });
        }


        // Update user in the database to remove imageName
        try {
            existingUser.imageName = newImageName; // Set imageName to undefined or null
            await existingUser.save();

            console.log('New User imageName updated successfully to database');
        } catch (error) {
            console.error('Error updating user profile image:', error);
            res.status(500).json({ success: false, message: 'Error updating user profile image' });
        }

        try {
            const preSignedUrls = await generatePresignedUrls(await User.find());

            const imageUrl = (req.file) ? preSignedUrls.find(url => url.userId.toString() === existingUser._id.toString())?.imageUrl : null

            res.json({ success: true, message: 'User profile image updated successfully', imageUrl });

            console.log('User profile image updated successfully');
        } catch (error) {
            console.error('Error  finding updated user:', error);
            res.status(500).json({ success: false, message: 'Error updated user' });
        }
    } catch (error) {
        console.error('Error updating user profile image:', error);
        res.status(500).json({ success: false, message: 'Error updating user profile image' });
    }
});

export default change_profile_image;
