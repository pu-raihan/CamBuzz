import express from "express";
import { getClass,editClass, addClass, deleteClass } from "../controllers/clas.js";

const router = express.Router();

router.get("/", getClass);
router.post("/", addClass);
router.put("/", editClass);
router.delete("/:name", deleteClass);

export default router;
