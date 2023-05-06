import express from "express";
import { getResources } from "../controllers/resource.js";

const router = express.Router();

router.get("/:resource", getResources);

export default router;
