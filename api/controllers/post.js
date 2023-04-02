import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = `select p.*,u.username as username,profilePic from posts as p join users as u on(u.username=p.username) 
      left join relationships as r on (p.username = r.followedUserId) where r.followerUserId=? or p.username=?
      order by p.createdAt DESC`;

    db.query(q, [userInfo.username, userInfo.username], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "insert into posts(`desc`,`img`,`createdAt`,`username`) values(?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("New post created");
    });
  });
};
