import mysql from "mysql2/promise";
import { config as dotenv } from "dotenv";
dotenv({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.testing" });

const database = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPWD,
  database: process.env.DATABASE,
  port: 3306,
});

export default database;
