import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
// import uuid from 'uuid';
import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4());
import jwt from 'jsonwebtoken';

import conn from '../database/db.js';
// import userMiddleware from '../middleware/users.js';


// 
router.post('/sign-up', (req, res, next) =>{
    res.send('hey there stranger..sign up');
})

router.post('/login', (req, res, next) => {
    res.send('wecome back.. sign in')
})

// authenticated pages
router.get('/profile', (req, res)=>{
    res.send("hey there>>authenticated user")
})

export default router;