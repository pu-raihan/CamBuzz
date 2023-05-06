import { db } from "../connect.js";

export const getResources = (req, res) => {
  const resource = req.params.resource;
  const q = "select * from " + resource;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
