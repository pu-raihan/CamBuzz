import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../firebase.js";
import {
  signInWithEmailAndPassword,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const register = (req, res) => {
  const q = "select * from users where username=?";
  let email = req.body.email;
  var re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    if (
      email.indexOf(
        "@pondiuni.ac.in",
        email.length - "@pondiuni.ac.in".length
      ) !== -1 ||
      email.indexOf(
        "@pondiuni.edu.in",
        email.length - "@pondiuni.edu.in".length
      ) !== -1
    ) {
      db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        const salt = bcrypt.genSaltSync(10);
        const hashedPwd = bcrypt.hashSync(req.body.password, salt);
        const q =
          "insert into users(`username`,`email`,`password`, `class`, `type`) values(?)";
        const values = [
          req.body.username,
          email,
          hashedPwd,
          req.body.clas,
          "student",
        ];

        createUserWithEmailAndPassword(auth, email, req.body.password)
          .then((user) => {
            const currUser = user.user;
            sendEmailVerification(currUser)
              .then(() => {
                db.query(q, [values], (err, data) => {
                  if (err) return res.status(500).json(err.message);
                  return res.status(200).json("User added successfully");
                });
              })
              .catch((error) => {
                console.log(error.message);
                return res.status(500).json(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
            return res.status(500).json(error.message);
          });
      });
    } else
      return res
        .status(500)
        .json(
          "This email does not belongs to a pondicherry university student"
        );
  } else return res.status(500).json("This is not a valid email");
};

export const login = (req, res) => {
  const q = "select * from users where username=?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    if (data[0].type !== "student")
      return res.status(404).json("Not a student! check the faculty box");

    const checkPwd = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPwd) return res.status(400).json("Wrong username or password!");
    signInWithEmailAndPassword(auth, data[0].email, req.body.password)
      .then((user) => {
        const token = jwt.sign({ username: data[0].username }, "cambuzzsecret");
        var { password, ...others } = data[0];
        others = { ...others, emailVerified: user.user.emailVerified };

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json(others);
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json(error.message);
      });
  });
};

export const facLogin = (req, res) => {
  const q = "select * from users where username=?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    if (data[0].type !== "faculty")
      return res.status(404).json("Not a faculty!");

    const checkPwd = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPwd) return res.status(400).json("Wrong username or password!");
    signInWithEmailAndPassword(auth, data[0].email, req.body.password)
      .then((user) => {
        const token = jwt.sign({ username: data[0].username }, "facultysecret");
        var { password, ...others } = data[0];
        others = { ...others, emailVerified: user.user.emailVerified };

        res
          .cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          })
          .status(200)
          .json(others);
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json(error.message);
      });
  });
};

export const adminLogin = (req, res) => {
  const q = "select * from admin";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.status(500).json("Database error");
    }

    if (data.length === 0)
      return res.status(404).json("Admin not found..contact the developers");
    if (data[0].email !== req.body.email)
      return res.status(400).json("No admin on this mail id!");
    const checkPwd = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPwd) return res.status(400).json("Wrong password!");
    const token = jwt.sign({ username: data[0].username }, "cambuzzadmin");
    var { password, ...others } = data[0];
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(others);
  });
};

export const update = (req, res) => {
  const q = "select * from users where username=?";

  db.query(q, [req.query.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const token = jwt.sign({ username: data[0].username }, "cambuzzsecret");

    var { password, ...others } = data[0];
    others = { ...others, emailVerified: true };
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json(others);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User logged out");
};
