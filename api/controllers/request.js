import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRequests = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "facultysecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");
    const q =
      "SELECT posts.*,users.profilePic FROM posts INNER JOIN users ON posts.username = users.username WHERE posts.published = 0 AND users.class = ?";
    db.query(q, [req.query.class], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const approveReq = (req, res) => {
  const token = req.cookies.accessToken;
  const approved = req.body.approved;

  if (!token) return res.status(401).json("Not logged in");
  jwt.verify(token, "facultysecret", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    if (approved) {
      const q = "update posts set published=1 WHERE postid = ? ";
      db.query(q, [req.body.postid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
      });
    }
    if (!approved) {
      const q = "delete from posts where postid=?";
      db.query(q, [req.body.postid], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Post deleted");
        return res.status(403).json("Post didn't delete");
      });
    }
  });
};
