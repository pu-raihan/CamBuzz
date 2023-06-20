import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelations = (req, res) => {
  const q = "select follower from relationships where followed=?";

  db.query(q, [req.query.followed], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data.map((relation) => relation.follower));
  });
};

export const addRelation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err)
    jwt.verify(token, "facultysecret", (err, userInfo) => {
      if (err) return res.status(403).json("Token invalid!");

    const q = "insert into relationships(`follower`,`followed`) values(?)";

    const values = [userInfo.username, req.body.username];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("followed");
    });
  });
});
};

export const deleteRelation = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    if (err) 
    jwt.verify(token, "facultysecret", (err, userInfo) => {
      if (err) return res.status(403).json("Token invalid!");

    const q = "delete from relationships where follower= ? and followed=? ";

    db.query(q, [userInfo.username, req.query.username], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Unfollowed");
    });
  });
});
};
