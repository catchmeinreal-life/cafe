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
        
router.post('/login', (req, res, next) => {
    conn.query(
        'SELECT * FROM users WHERE username = ?;',
        [req.body.username],
        (err, result) =>{
            if(err){
                return res.status(400).send({
                    message : err,
                });
            }
            if(!result.length){
                return res.status(400).send({
                    message : 'Username or password incorrect',
                });
            }

            bcrypt.compare(
                req.body.password, result[0]['password'],
                (bErr, bResult)=>{
                    if(bErr){
                        return res.status(400).send({
                            message : 'Username or password incorrect!',
                        });
                    }
                    if(bResult){
                        //password match
                        const token = jwt.sign(
                            {
                                username: result[0].username,
                                userId: result[0].user_id,
                            },
                            process.env.SECRETKEY,
                            { expiresIn: '7d'}
                        );
                        conn.query('UPDATE users SET last_login = now() WHERE user_id = ?;',
                        [result[0].user_id]);
                        return res.status(200).send({
                            message : 'Logged in!',
                            token,
                            user: result[0],
                        });
                    }
                    return res.status(400).send({
                        message : 'Username or password incorrect!',
                    });
                }
            );
        }
    );
});

// authenticated pages
router.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'main.html'));
});

export default router;