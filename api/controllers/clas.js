import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getClass = (req, res) => {
  var q = `select * from classes `;
  const classname = req.query.classname;
  if(classname!==undefined)
  var q = `select username,fullname,profilePic from users where class='${classname}'`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json("database error :"+err.message);
    return res.status(200).json(data);
  });
};

export const addClass = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json("Admin not logged in");
  const texts = req.body.texts;
  jwt.verify(token, "cambuzzadmin", (err, adminInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "select * from classes where name=?";

    db.query(q, [texts.name], (err, data) => {
      if (err) return res.status(500).json("database error :"+err.message);
      if (data.length) return res.status(409).json("Class already exists!");

      const q = "insert into classes(`name`,`dept`,`faculty`) values(?)";
      const values = [texts.name, texts.dept, texts.faculty];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json("database error :"+err.message);
        return res.status(200).json("Class added successfully");
      });
    });
  });
};
export const editClass = (req, res) => {
  const token = req.cookies.adminToken;
  console.log(req.body);
  if (!token) return res.status(401).json("Admin not logged in");
  const texts = req.body.texts;
  jwt.verify(token, "cambuzzadmin", (err, adminInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
    "update classes set faculty=? where name=?";
   
      db.query(q,[texts.faculty, texts.name] , (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Class added successfully");
      });
    });
};

export const deleteClass = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzadmin", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from classes where name=?";
    db.query(q, req.params.name, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("User deleted");
      return res.status(403).json("Unknown error");
    });
  });
};
