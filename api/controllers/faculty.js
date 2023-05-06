import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../firebase.js";
import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const getFaculty = (req, res) => {
  const q = `select * from users where type="faculty" order by uId DESC`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const addFaculty = (req, res) => {
  const token = req.cookies.adminToken;
  if (!token) return res.status(401).json("Admin not logged in");

  jwt.verify(token, "cambuzzadmin", (err, adminInfo) => {
    if (err) return res.status(403).json("Token invalid!");

    let texts = req.body.texts;
    var re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(texts.email)) {
      if (
        texts.email.indexOf(
          "@pondiuni.ac.in",
          texts.email.length - "@pondiuni.ac.in".length
        ) !== -1 ||
        texts.email.indexOf(
          "@pondiuni.edu.in",
          texts.email.length - "@pondiuni.edu.in".length
        ) !== -1
      ) {
        const q = "select * from users where username=?";

        db.query(q, [texts.username], (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length)
            return res.status(409).json("Faculty already exists!");

          const salt = bcrypt.genSaltSync(10);
          const hashedPwd = bcrypt.hashSync(texts.password, salt);
          const q =
            "insert into users(`username`,`fullname`,`email`,`password`,`type`) values(?)";
          const values = [texts.username,texts.fullname, texts.email, hashedPwd, "faculty"];

          createUserWithEmailAndPassword(auth, texts.email,texts.password)
            .then((user) => {
              const currUser = user.user;
              sendEmailVerification(currUser)
                .then(() => {
                  db.query(q, [values], (err, data) => {
                    if (err) return res.status(500).json(err);
                    return res.status(200).json("Faculty added successfully");
                  });
                })
                .catch((error) => {
                  console.log(error.message);
                  return res.status(500).json(error);
                });
            })
            .catch((error) => {
              console.log(error.message);
              return res.status(500).json(error);
            });
        });
      } else
        return res
          .status(500)
          .json(
            "This email does not belongs to a pondicherry university faculty"
          );
    } else return res.status(500).json("Not an email");
  });
};
