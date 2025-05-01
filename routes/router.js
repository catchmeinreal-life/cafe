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
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next) =>{
    conn.query(
        `SELECT user_id FROM users WHERE LOWER(username) = LOWER(?);`,
        [req.body.username],
        (err, result) =>{
            if(result && result.length){
                //error
                return res.status(409).send({
                    message : 'username aready in use!'
                });
            } else {
                // username not in use
                bcrypt.hash(req.body.password, 10, (err, hash)=>{
                    if(err){
                        return res.status(500).send({
                            message : err,
                        });
                    } else {
                        conn.query(
                            'INSERT INTO users (user_id, username, password, email, created_at) VALUES (?,?,?,?, now());',
                            [uuidv4(), req.body.username,hash, req.body.email,],
                            (err,result)=>{
                                if(err){
                                    return res.status(400).send({
                                        message : err,
                                    });
                                }
                                return res.status(201).send({
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
    res.send('wecome back.. sign in')
})

// authenticated pages
router.get('/profile', (req, res)=>{
    res.send("hey there>>authenticated user")
})

export default router;