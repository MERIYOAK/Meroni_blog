import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handleRequest = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../../../frontend_react_app/dist', 'index.html'));
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

export default handleRequest;
