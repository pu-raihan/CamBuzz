import express from "express";
import { getResult } from "../controllers/search.js";

const router = express.Router();

router.get("/:keyword", getResult);

export default router;
