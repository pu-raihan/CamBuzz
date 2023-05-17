import express from "express";
import { getRequests, approveReq } from "../controllers/request.js";

const router = express.Router();

router.get("", getRequests);
router.post("", approveReq);

export default router;