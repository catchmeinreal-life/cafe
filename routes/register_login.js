import express from 'express';
const router = express.Router();

// serving static files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import bcrypt from 'bcrypt';
// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());
import jwt from 'jsonwebtoken';

import conn from '../database/db.js';
import userMiddleware from '../middleware/users.js';


// 
router.post('/sign-up', userMiddleware.validateRegister, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user exists
        const [existingUsers] = await conn.query(
            `SELECT user_id FROM users WHERE LOWER(username) = LOWER(?)`,
            [username]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Username already in use!' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user
        const userId = uuidv4();
        await conn.query(
            `INSERT INTO users (user_id, username, password, email, created_at) VALUES (?, ?, ?, ?, NOW())`,
            [userId, username, hashedPassword, email]
        );

        console.log(`User ${username} was added`);
        res.status(201).json({ message: 'User added!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});
        
router.post('/login', async (req, res) => {
    /**interact with the database */
    console.log(req.body);

    try {
        const [rows] = await conn.query(
            'SELECT * FROM users WHERE email = ?', [req.body.email]
        );
        console.log(rows[0]);
        if (rows.length === 0) { //user not found
            res.status(400).json({message : 'Invalid credentials'});
        }

        const user = rows[0];  //user object
        const passwordMatch = await bcrypt.compare(req.body.password, user.password); //boolean
        console.log(passwordMatch)
        

        if (!passwordMatch) {
            return res.status(400).json({message : 'invalid password'})
        }
        
        const token = jwt.sign({
            userId: user.user_id,
            username : user.username,
        }, process.env.SECRETKEY, { expiresIn : '1hr'});

        await conn.query('UPDATE users SET last_login = NOW() WHERE user_id = ?', [user.user_id]);

        const { user_id, username, email, last_login } = user;

        return res.status(200).send({
            message : 'Logged in!',
            token,
            user : { user_id, username, email, last_login}
        })


    } catch (error) {
        console.log('error occured: ' + error);  //querry error
    }

});

// authenticated pages
router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'main.html'));
});

export default router;