import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());
import jwt from 'jsonwebtoken';

import conn from '../database/db.js';
import userMiddleware from '../middleware/users.js';


// 
router.post('/sign-up', (req, res, next) =>{
    console.log(req.body); 
    conn.query(
        `SELECT user_id FROM users WHERE LOWER(username) = LOWER(?);`,
        [req.body.username],
        (err, result) =>{
            if(result && result.length){
                //error
                return res.status(409).json({
                    message : 'username aready in use!'
                });
            } else {
                // username not in use
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                        return res.status(500).json({
                            message : err,
                        });
                    } else {
                        conn.query(
                            'INSERT INTO users (user_id, username, password, email, created_at) VALUES (?,?,?,?, now());',
                            [uuidv4(), req.body.username,hash, req.body.email,],
                            (err,result)=>{
                                if(err){
                                    return res.status(400).json({
                                        message : err,
                                    });
                                }
                                return res.status(201).json({
                                    message : 'Registered!',
                                });
                            }
                        );
                    }
                });
            }
        }
    );
});

router.post('/login', (req, res, next) => {
    conn.query(
        'SELECT * FROM users WHERE username = ?;',
        [req.body.username],
        (err, result) =>{
            if(err){
                // log the err
                console.error('Database error:', err);
                return res.status(500).json({
                    message : err, //'internal server error'
                });
            }
            if(!result.length){
                return res.status(400).json({
                    message : 'Username or password incorrect',
                });
            }

            bcrypt.compare(
                req.body.password, result[0]['password'],
                (bErr, bResult)=>{
                    if(bErr){
                        return res.status(400).json({
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
                            'SECRETKEY',
                            { expiresIn: '7d'}
                        );
                        conn.query('UPDATE users SET last_login = now() WHERE user_id = ?;',
                        [result[0].user_id]);
                        return res.status(200).json({
                            message : 'Logged in!',
                            token,
                            user: result[0],
                        });
                    }
                    return res.status(400).json({
                        message : 'Username or password incorrect!',
                    });
                }
            );
        }
    );
});

// authenticated pages
router.get('/profile', (req, res)=>{
    res.send("hey there>>authenticated user")
})

export default router;