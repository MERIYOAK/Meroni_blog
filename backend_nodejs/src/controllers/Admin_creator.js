// userService.js
import bcrypt from 'bcrypt';
import { User } from '../models/user.js'; // Adjust the path based on your project structure

const createAdmin = async () => {
    try {
        const AdminExists = await User.findOne({ email: process.env.EMAIL });

        if (!AdminExists) {
            try {
                const hash = await bcrypt.hash(process.env.PASSWORD, parseInt(process.env.SALT_ROUNDS));
                const singleAdmin = new User({
                    id: 1,
                    firstName: process.env.FIRST_NAME,
                    middleName: process.env.MIDDLE_NAME,
                    lastName: process.env.LAST_NAME,
                    username: 'meron',
                    email: process.env.EMAIL,
                    imageUrl: 'http://localhost:3000/uploads/meron.jpeg',
                    password: hash,
                    role: 'Admin',
                    birthDate: '1993-10-01',
                    telephone: '+244 922 706 107',
                    country: 'Angola',
                    city: 'Luanda',
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
