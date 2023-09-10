import { db } from "../connect.js";

export const getResHead = (req, res) => {
  const resource = req.params.resource;
  const q = "select * from resources where name=?";
  db.query(q, resource, (err, data) => {
    if (err) return res.status(500).json(err.message);
    return res.status(200).json(data);
  });
};
