import express from "express";
import { getResHead } from "../controllers/reshead.js";

const router = express.Router();

router.get("/:resource", getResHead);

export default router;
