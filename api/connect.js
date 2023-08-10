import mysql from "mysql"

export const db =mysql.createConnection({
    host:"db4free.net",
    user:"cambuzzuser",
<<<<<<< HEAD
    password:"773008cambuzz",
=======
    password:process.env.DB_PWD,
>>>>>>> 891a828c89ea96e18ddc6a521501bb5aa02036aa
    database:"cambuzz"
})
