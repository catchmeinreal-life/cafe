import express from 'express';
import conn from '../database/db.js';

const router = express.Router();


// GET all products
router.get('/', async (req, res) => {

  try {
    const [rows] = await conn.query('SELECT * FROM products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

export default router;

// POST new product
// router.post('/', async (req, res) => {
//   const { name, description, price } = req.body;

//     if (!name || !description || !price) {
//         return res.status(400).json({ error: 'All fields are required' });
//     }

//     try {
//         const [result] = await conn.query(
//         'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
//         [name, description, price]
//         );
//         res.status(201).json({ message: 'Product added', id: result.insertId });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });