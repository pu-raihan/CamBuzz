import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "select username from likes where postid=?";

  db.query(q, [req.query.postid], (err, data) => {
    if (err) return res.status(500).json(err.message);
    return res.status(200).json(data.map((like) => like.username));
  });
};

export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err)
      jwt.verify(token, "facultysecret", (err2, userInfo) => {
        if (err2) return res.status(403).json("Token invalid!");

        const q = "insert into likes(`username`,`postid`) values(?)";

        const values = [userInfo.username, req.body.postid];

        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err.message);
          return res.status(200).json("Post liked");
        });
      });
  });
};

export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err)
      jwt.verify(token, "facultysecret", (err2, userInfo) => {
        if (err2) return res.status(403).json("Token invalid!");

        const q = "delete from likes where username= ? and postid=? ";

        db.query(q, [userInfo.username, req.query.postid], (err, data) => {
          if (err) return res.status(500).json(err.message);
          return res.status(200).json("Post unliked");
        });
      });
  });
};
