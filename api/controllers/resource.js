import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getResources = (req, res) => {
  const resource = req.params.resource;
  if (resource === "toilet") {
    const q = "SELECT * FROM dept UNION SELECT * FROM hostel;";
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json(data);
    });
  } else {
    const q = "select * from " + resource;
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.status(200).json(data);
    });
  }
};

export const addResource = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "cambuzzadmin", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    const q =
      "insert into " +
      req.body.texts.resource +
      "( `avail`, `coordinates`,`name`,`remarks`) VALUES (?,ST_GeomFromText('POINT(" +
      req.body.texts.x +
      " " +
      req.body.texts.y +
      ")'),?,?)";
    console.log(req.body);

    db.query(
      q,
      [req.body.texts.avail, req.body.texts.name, req.body.texts.remarks],
      (err, data) => {
        if (err) return res.status(500).json(err.message);
        return res.status(200).json("New resource created");
      }
    );
  });
};
