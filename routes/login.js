import express from 'express';

// import conn from '../database/db';

const router = express.Router();

router.get('/login', (req, res) =>{
    res.send('login page');
})

export default router;