import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const conn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});


try {
    const connection = await conn.getConnection();
    console.log('Connected to the database');
    connection.release();
} catch (err) {
    console.error('Error connecting to the database:', err.message);
}

// try {  //adding elements to the table
//     const sql = `INSERT INTO products (name, description, price) VALUES("MOCHA", "brewed", 30.4) `;
//     conn.query(sql);
//     console.log("table updated");
// } catch (error) {
//     console.log(error)
// }

export default conn;