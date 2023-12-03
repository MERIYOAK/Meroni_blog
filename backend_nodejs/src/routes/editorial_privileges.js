import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';



const editorial_privileges = express();


editorial_privileges.get('/editorial_privileges', (req, res) => {
    try {
        res.render('verify_editorial_privileges.ejs');
    } catch (error) {
        console.error('Error rendering verify_editorial_privileges.ejs:', error);
        res.json({ error: 'Error rendering verify_editorial_privileges.ejs' });
    }
});

editorial_privileges.post('/editorial_privileges', async (req, res) => {
    const { username, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: username });
        if (foundUser) {
            const result = await bcrypt.compare(password, foundUser.password);

            if (result) {
                req.session.isAuthenticated = true;
                req.session.userRole = process.env.SESSION_ROLE;

                req.session.save((err) => {
                    if (err) {
                        console.error('Error saving session:', err);
                        res.json({ error: 'Error saving session' });
                    } else {
                        res.render('crud');
                    }
                });
            } else {
                res.json({ error: 'Incorrect password' });
            }
        } else {
            res.json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error verifying credentials:', error);
        res.json({ error: 'Error verifying credentials' });
    }
});

export default editorial_privileges;