import express from "express";
import { getResources, addResource } from "../controllers/resource.js";

const router = express.Router();

router.get("/:resource", getResources);
router.post("/", addResource);

export default router;
