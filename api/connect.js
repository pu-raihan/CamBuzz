import mysql from "mysql"

export const db =mysql.createConnection({
    host:"db4free.net",
    user:"cambuzzuser",
    password:process.env.DB_PWD,
    database:"cambuzz"
})