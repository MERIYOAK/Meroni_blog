import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import generateTokens from '../controllers/token_generator.js';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import sharp from 'sharp';
import { generatePresignedUrls } from '../controllers/imageUrlGenerator.js';

const sign_up = express();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_REGION = process.env.BUCKET_REGION
const ACCESS_KEY_ID = process.env.ACCESS_KEY
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    region: BUCKET_REGION,
    credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
const imageName = randomImageName();

sign_up.post('/sign_up', upload.single('image'), async (req, res) => {
    const { username, password, firstName, middleName, lastName, role, birthDate, telephone, country, city, bio } = req.body;
    const userEmail = `${username.toLowerCase()}@meroni.com`;
    try {
        if (req.file) {
            const userExists = await User.findOne({ email: userEmail });

            if (userExists) {
                res.json({ error: true, message: 'User already exists' });
                console.log('User Name already exists');
            }

            const buffer = await sharp(req.file.buffer).resize({ width: 200, height: 200, fit: 'cover' }).toBuffer();
            try {
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: imageName,
                    Body: buffer,
                    ContentType: req.file.mimetype
                };

                const command = new PutObjectCommand(params);
                await s3.send(command);
                console.log('Image uploaded successfully to S3');
            } catch (error) {
                console.error('Error uploading image to S3:', error);
            }

            const hash = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
            let lastPost;
            let lastId = 0;

            lastPost = await User.find().sort({ id: -1 }).limit(1).exec();
            if (lastPost && lastPost.length > 0) {
                lastId = lastPost[0].id;
            }
            const id = lastId + 1;

            // Save the rest of the data to the database
            const newUser = new User({
                id,
                email: userEmail,
                password: hash,
                firstName,
                middleName,
                lastName,
                username,
                imageName: imageName,
                role: role,
                birthDate,
                telephone,
                country,
                city,
                bio
            });

            try {
                await newUser.save();

                const preSignedUrls = await generatePresignedUrls(await User.find());
                const imageUrl = preSignedUrls.find(url => url.userId.toString() === newUser._id.toString())?.imageUrl || null;

                const { accessToken, refreshToken } = generateTokens(newUser);

                //Set session values
                req.session.isAuthenticated = true;
                req.session.userRole = newUser.role;
                req.session.userId = newUser._id.toString();

                await new Promise((resolve, reject) => {
                    req.session.save((err) => {
                        if (err) {
                            reject(err);
                            console.error('Error saving session:', err);
                        } else {
                            resolve();
                            console.log('Session saved successfully');
                        }
                    });
                });



                if (role === 'Reader') {
                    res.json({
                        success: true,
                        message: 'User created successfully',
                        sessionId: req.sessionID,
                        isAuthenticated: req.session.isAuthenticated,
                        userRole: req.session.userRole,
                        id: req.session.userId,
                        firstName: newUser.firstName,
                        middleName: newUser.middleName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        username: newUser.username,
                        imageUrl: imageUrl,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                    console.log('User created successfully');
                } else if (role === 'Pending') {
                    res.json({
                        success: true,
                        message: 'Editor created successfully, please wait for approval',
                        sessionId: req.sessionID,
                        isAuthenticated: req.session.isAuthenticated,
                        userRole: req.session.userRole,
                        id: req.session.userId,
                        firstName: newUser.firstName,
                        middleName: newUser.middleName,
                        lastName: newUser.lastName,
                        email: newUser.email,
                        username: newUser.username,
                        imageUrl: imageUrl,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    });
                    console.log('Editor created successfully, please wait for approval');
                }
            } catch (saveError) {
                console.error('Error saving user to the database:', saveError);
                res.json({ error: true, message: 'Error saving user to the database' });
            }

        } else {
            // Handle the case where no image is provided
            res.json({ error: true, message: 'Image is required' });
        }
    } catch (error) {
        console.error('Error creating newUser:', error);
        res.status(500).json({ error: 'Error creating reader' });
    }
});

export default sign_up;