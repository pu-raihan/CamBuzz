import express from "express";
import { getFaculty, addFaculty } from "../controllers/faculty.js";

const router = express.Router();

router.get("/", getFaculty);
router.post("/", addFaculty);

export default router;
