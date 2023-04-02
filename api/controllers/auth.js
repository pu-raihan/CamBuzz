import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const q = "select * from users where username=?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hashedPwd = bcrypt.hashSync(req.body.password, salt);
    const q = "insert into users(`username`,`email`,`password`) values(?)";
    const values = [req.body.username, req.body.email, hashedPwd];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User added successfully");
    });
  });
};

export const login = (req, res) => {
  const q = "select * from users where username=?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPwd = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPwd) return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ username: data[0].username }, "cambuzzsecret");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  })
  .status(200)
  .json("User logged out");
};
