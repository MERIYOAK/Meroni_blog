import { v4 as uuidv4 } from 'uuid';
import { config as configDotenv } from 'dotenv';
import fs from 'fs/promises';

configDotenv();

const UPLOADS_DIR = process.env.UPLOADS_DIR;
const BASE_API_URL = process.env.BASE_API_URL;

// Create the 'uploads' directory if it doesn't exist
await fs.mkdir(UPLOADS_DIR, { recursive: true });

const handleImage = async (imageBuffer) => {
    try {
        const filename = generateUniqueFilename();
        const filePath = `${UPLOADS_DIR}/${filename}`;

        // Write the image buffer to the file
        await fs.writeFile(filePath, imageBuffer);

        // Return the URL or path to the saved image
        return buildImageUrl(filename);
    } catch (error) {
        console.error('Error handling image:', error);
        throw new Error('Error handling image');
    }
};

const generateUniqueFilename = () => {
    return `image_${uuidv4()}.png`;
};

const buildImageUrl = (filename) => {
    return `${BASE_API_URL}/${UPLOADS_DIR}/${filename}`;
};

export default handleImage;

