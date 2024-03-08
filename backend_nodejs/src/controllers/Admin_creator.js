// userService.js
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config as configDotenv } from "dotenv";
import crypto from 'crypto';
import sharp from 'sharp';

configDotenv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const meronImagePath = path.join(__dirname, '../../public/meron.jpeg');

const s3 = new S3Client({
    region: process.env.BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    }
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const imageName = randomImageName();


const createAdmin = async () => {
    try {
        const AdminExists = await User.findOne({ email: process.env.EMAIL });
        if (!AdminExists) {
            try {

                try {
                    const imageFile = fs.readFileSync(meronImagePath);

                    if (!imageFile) {
                        throw new Error('Image file not found');
                    } else {
                        console.log('Image file found:');
                    }

                    const buffer = await sharp(imageFile).resize({ width: 200, height: 200, fit: 'cover' }).toBuffer();

                    const params = {
                        Bucket: process.env.BUCKET_NAME,
                        Key: imageName,
                        Body: buffer,
                        ContentType: 'image/jpeg',
                    };

                    try {
                        const command = new PutObjectCommand(params);
                        await s3.send(command);
                        console.log('Image uploaded successfully to S3');
                    } catch (uploadError) {
                        console.error('Error uploading image to S3:', uploadError);
                    }
                } catch (error) {
                    console.error('Error reading image file:', error);
                }

                const hash = await bcrypt.hash(process.env.PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const singleAdmin = new User({
                    id: 1,
                    firstName: process.env.FIRST_NAME,
                    middleName: process.env.MIDDLE_NAME,
                    lastName: process.env.LAST_NAME,
                    username: process.env.USER_NAME,
                    email: process.env.EMAIL,
                    imageName: imageName,
                    password: hash,
                    role: process.env.REQUIRED_ROLES_FOR_MODERATION,
                    birthDate: process.env.BIRTH_DATE,
                    telephone: process.env.TELEPHONE,
                    country: process.env.COUNTRY,
                    city: process.env.CITY,
                    bio: 'Hello, I am the admin!',
                });

                try {
                    await singleAdmin.save();
                    console.log('Admin created successfully');
                } catch (saveError) {
                    console.error('Error saving admin to the database:', saveError);
                }
            } catch (hashError) {
                console.error('Error hashing password:', hashError);
            }
        } else {
            console.log('Admin already exists');
        }
    } catch (error) {
        console.error('Error checking for existing user:', error);
    }
};

export default { createAdmin };
