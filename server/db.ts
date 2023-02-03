import mysql from "mysql2/promise";

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
  database: process.env.DATABASE,
});

export default database;
