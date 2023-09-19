import express from "express";
import {
  login,
  facLogin,
  guestLogin,
  adminLogin,
  update,
  register,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/faclogin", facLogin);
router.post("/guestlogin", guestLogin);
router.post("/adminlogin", adminLogin);
router.post("/update", update);
router.post("/register", register);
router.post("/logout", logout);

export default router;
