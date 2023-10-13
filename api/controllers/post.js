import { db, guestDb } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const username = req.query.username;
  const token = req.cookies.accessToken;
  const type = req.query.type;
  var secret;
  if (!token) return res.status(401).json("Not logged in");
  if (type === "faculty") secret = "facultysecret";
  if (type === "student") secret = "cambuzzsecret";
  if (type === "guest") secret = "guestsecret";

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");
    const q =
      username !== "undefined"
        ? `select p.*,u.username as username,profilePic from posts as p join users as u on (u.username=p.username) where p.username=? and p.published=1 order by p.createdAt DESC`
        : `select DISTINCT p.*,u.username as username,profilePic from posts as p join users as u on (u.username=p.username) left join relationships as r on (p.username = r.followed) where (r.follower=? or p.username=?)and p.published=1 order by p.createdAt DESC`;

    const values =
      username !== "undefined"
        ? [username]
        : [userInfo.username, userInfo.username];

    if (type === "guest")
      guestDb.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err.message);
        return res.status(200).json(data);
      });
    else
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err.message);
        return res.status(200).json(data);
      });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  var secret = req.body.type;
  var published = 1;
  if (!token) return res.status(401).json("Not logged in");
  if (secret === "faculty") {
    secret = "facultysecret";
    published = 1;
  }
  if (secret === "student") secret = "cambuzzsecret";

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
      "insert into posts(`desc`,`img`,`createdAt`,`username`,`published`) values(?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
      published,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("database error :"+err.message);
      return res.status(200).json("New post created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  var secret = req.query.type;
  if (!token) return res.status(401).json("Not logged in");
  if (secret === "faculty") secret = "facultysecret";
  if (secret === "student") secret = "cambuzzsecret";

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from posts where postid=? and username=?";
    db.query(q, [req.query.postid, userInfo.username], (err, data) => {
      if (err) return res.status(500).json("database error :"+err.message);
      if (data.affectedRows > 0) return res.json("Post deleted");
      return res.status(403).json("You cannot delete others post");
    });
  });
};
