import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `select c.*,u.username as username,profilePic from comments 
    as c join users as u on(u.username=c.username) where c.postid=?
    order by c.createdAt DESC`;

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
      "insert into comments(`desc`,`createdAt`,`username`,`postid`) values(?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
      req.body.postid,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("New commment posted");
    });
  });
};
