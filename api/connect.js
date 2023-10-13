import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: "cambuzz",
});

export const guestDb = mysql.createConnection({
  host: "db4free.net",
  user: "cambuzzguest",
  password: "773008guest",
  database: "guestcambuzz",
});

export const resetDBConn = () => {
  db.end();
};
