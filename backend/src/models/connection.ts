import mysql from 'mysql2/promise';
import 'dotenv/config'

const connection = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  port: Number(process.env.MYSQLPORT || 3306),
})

export default connection;