import express from "express";
import { getUser, updateUser,deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/:username", getUser);
router.put("/", updateUser);
router.delete("/:username", deleteUser);

export default router;
