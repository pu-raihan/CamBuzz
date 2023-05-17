import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const username = req.params.username;
  const q = "select * from users where username=?";

  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  var secret = req.body.type;
  if (!token) return res.status(401).json("Not logged in");
  if (secret === "faculty") secret = "facultysecret";
  if (secret === "student") secret = "cambuzzsecret";
console.log(secret);
  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
      "update users set fullname=?,email=?, city=?, website=?, profilePic=?, coverPic=? where username=?";
   
      db.query(
      q,
      [
        req.body.fullname,
        req.body.email,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        req.body.coverPic,
        userInfo.username,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated");
        return res.status(403).json("You cannot update others profile");
      }
    );
  });
};

export const deleteUser = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzadmin", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from users where username=?";
    db.query(q, req.params.username, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("User deleted");
      return res.status(403).json("Unknown error");
    });
  });
};