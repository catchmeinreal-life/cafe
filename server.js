import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;

const app = express();

//importing the conn
import conn from './database/db.js'
//importing the routes
import productsRoute from './routes/products.js';

// serving static files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/login', (req, res) => {
  res.send('login page');
})

// use routes
app.use('/products', productsRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
