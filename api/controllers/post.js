import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const username = req.query.username;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
      username !== "undefined"
        ? `select p.*,u.username as username,profilePic from posts as p join users as u on (u.username=p.username) where p.username=? and p.published=1 order by p.createdAt DESC`
        : `select DISTINCT p.*,u.username as username,profilePic from posts as p join users as u on (u.username=p.username) left join relationships as r on (p.username = r.followed) where (r.follower=? or p.username=?)and p.published=1 order by p.createdAt DESC`;

    const values =
      username !== "undefined"
        ? [username]
        : [userInfo.username, userInfo.username];

    db.query(q, values, (err, data) => {
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

    const q =
      "insert into posts(`desc`,`img`,`createdAt`,`username`) values(?)";

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

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from posts where postid=? and username=?";
    db.query(q, [req.params.postid, userInfo.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Post deleted");
      return res.status(403).json("You cannot delete others post");
    });
  });
};
