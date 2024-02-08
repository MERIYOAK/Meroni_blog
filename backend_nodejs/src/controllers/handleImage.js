import fs from 'fs/promises';
import { BASE_API_URL } from '../../config.js';

// Assume images will be stored in the 'uploads' directory
const UPLOADS_DIR = 'uploads';

// Create the 'uploads' directory if it doesn't exist
await fs.mkdir(UPLOADS_DIR, { recursive: true });

// Function to handle image storage
const handleImage = async (imageBuffer) => {
    try {
        // Generate a unique filename (you might want to use a library for this)
        const filename = `image_${Date.now()}.png`;

        // Path where the image will be saved
        const filePath = `${UPLOADS_DIR}/${filename}`;

        // Write the image buffer to the file
        await fs.writeFile(filePath, imageBuffer);

        // Return the URL or path to the saved image
        return `${BASE_API_URL}/${UPLOADS_DIR}/${filename}`; // In a real-world scenario, this would be the URL to the image on your server or a CDN
    } catch (error) {
        console.error('Error handling image:', error);
        throw new Error('Error handling image');
    }
};

export default handleImage;
