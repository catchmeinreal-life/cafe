import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const port = process.env.PORT;

const app = express();

//importing the conn
import conn from './database/db.js'
//importing the routes
import productsRoute from './routes/products.js';
import router from './routes/router.js'

// serving static files
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//serve static files from the public directory
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded




// use routes
app.use('/products', productsRoute);
app.use('/api', router);  //

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
