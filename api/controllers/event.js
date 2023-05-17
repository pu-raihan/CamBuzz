import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getEvents = (req, res) => {
  
 const q = `select * from events order by createdAt DESC`;


  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addEvent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "facultysecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");
    
    const q =
      "insert into events(`desc`,`img`,`date`,`username`,`venue`) values(?)";
console.log(req.body);
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.username,
      req.body.venue,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("New event created");
    });
  });
};

export const deleteEvent = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "facultysecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q = "delete from events where id=? and username=?";
    db.query(q, [req.query.postid, userInfo.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.json("Post deleted");
      return res.status(403).json("You cannot delete others post");
    });
  });
};
