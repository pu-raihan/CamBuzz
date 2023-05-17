import express from "express";
import {
  getChats,
  getChat,
  getForum,
  sendMessage,
} from "../controllers/chat.js";

const router = express.Router();

router.get("/all", getChats);
router.get("/single", getChat);
router.get("/forum", getForum);
router.post("/", sendMessage);

export default router;
