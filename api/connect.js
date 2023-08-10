import mysql from "mysql"

export const db =mysql.createConnection({
    host:"db4free.net",
    user:"cambuzzuser",
    password:"773008cambuzz",
    database:"cambuzz"
})
