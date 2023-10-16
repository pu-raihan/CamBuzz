import { db, guestDb } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStories = (req, res) => {
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
        ? `select s.*,u.username as username,profilePic from stories as s join users as u on (u.username=s.username) where s.username=? and createdAt >= NOW() - INTERVAL 1 DAY order by s.createdAt DESC`
        : `select DISTINCT s.*,u.username as username,profilePic from stories as s join users as u on (u.username=s.username) left join relationships as r on (s.username = r.followed) where (r.follower=? or s.username=?) and createdAt >= NOW() - INTERVAL 1 DAY order by s.createdAt DESC`;

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

export const addStory = (req, res) => {
  const token = req.cookies.accessToken;
  var secret = req.body.type;
  if (!token) return res.status(401).json("Not logged in");
  if (secret === "faculty") secret = "facultysecret";
  if (secret === "student") secret = "cambuzzsecret";
  console.log("story upload");
  jwt.verify(token, secret, (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "insert into stories(`img`,`createdAt`,`username`) values(?)";

    const values = [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json("database error :"+err.message);
      return res.status(200).json("New story added");
    });
  });
};

export const deleteStory = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from stories where sid=? and username=?";
    db.query(q, [req.params.sid, userInfo.username], (err, data) => {
      if (err) return res.status(500).json("database error :"+err.message);
      if (data.affectedRows > 0) return res.json("Story deleted");
      return res.status(403).json("You cannot delete others story");
    });
  });
};
