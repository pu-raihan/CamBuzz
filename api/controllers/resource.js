import { db } from "../connect.js";

export const getResources = (req, res) => {
  const resource = req.params.resource;
  if (resource === "toilet") {
    const q = "SELECT * FROM dept UNION SELECT * FROM hostel;" ;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  } else {
    const q = "select * from " + resource;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  }
};
