import { db, guestDb } from "../connect.js";
import jwt from "jsonwebtoken";

export const getResult = (req, res) => {
  const keyword = req.params.keyword;
  const token = req.cookies.accessToken;
  const q =
    "select uId as id,type,username,profilePic,fullname from users where username LIKE '%" +
    keyword +
    "%' or fullname LIKE '%" +
    keyword +
    "%' ORDER BY INSTR(username, '" +
    keyword +
    "');";
  jwt.verify(token, "cambuzzsecret", (err, userInfo) => {
    const secret = err ? "facultysecret" : "cambuzzsecret";
    jwt.verify(token, secret, (err, userInfo) => {
      if (err)
        jwt.verify(token, "guestsecret", (err, userInfo) => {
          if (err) return res.status(403).json("Token invalid!");
          guestDb.query(q, (err, data) => {
            if (err) return res.status(500).json(err);
            if (!data.length)
              return res.status(409).json(`No results found for '${keyword}'!`);
            return res.json(data);
          });
        });
      else
        db.query(q, (err, data) => {
          if (err) return res.status(500).json(err.message);
          if (!data.length)
            return res.status(409).json(`No results found for '${keyword}'!`);
          return res.json(data);
        });
    });
  });
};
