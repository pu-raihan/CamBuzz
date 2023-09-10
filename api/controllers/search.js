import { db } from "../connect.js";

export const getResult = (req, res) => {
  const keyword = req.params.keyword;
  const q =
    "select uId as id,type,username,profilePic from users where username LIKE '%" +
    keyword +
    "%' or fullname LIKE '%" +
    keyword +
    "%' ORDER BY INSTR(username, '"+keyword+"');";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err.message);
    if (!data.length)
      return res.status(409).json(`No results found for '${keyword}'!`);
    return res.json(data);
  });
};
