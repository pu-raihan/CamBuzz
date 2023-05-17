import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getChat = (req, res) => {
  const q = `select * from chats where (sender=? and receiver=?) or (sender=? and receiver=?) order by time DESC`;

  db.query(
    q,
    [req.query.user1, req.query.user2, req.query.user2, req.query.user1],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};
export const getChats = (req, res) => {
  const q = `SELECT 
  IF(sender=?, receiver, sender) AS username, 
  MAX(time) AS time,
  (SELECT profilePic FROM users WHERE username = IF(sender=?, receiver, sender)) AS profilePic
FROM 
  chats 
WHERE 
  sender = ? OR receiver = ?
GROUP BY 
  IF(sender=?, receiver, sender) 
ORDER BY 
  time DESC;`;

  db.query(
    q,
    [
      req.query.username,
      req.query.username,
      req.query.username,
      req.query.username,
      req.query.username,
    ],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    }
  );
};

export const getForum = (req, res) => {
  const q = `select * from forum order by time DESC`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const sendMessage = (req, res) => {
  var q;
  var values;
  if (req.body.forum) {
    q = "insert into forum(`sender`,`message`) values(?)";
    values = [req.body.sender, req.body.message];
  } else {
    q = "insert into chats(`sender`,`message`,`receiver`) values(?)";
    values = [req.body.sender, req.body.message, req.body.receiver];
  }
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("New message sent");
  });
};
