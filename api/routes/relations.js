import express from "express";
import { getRelations, addRelation, deleteRelation } from "../controllers/relation.js";

const router = express.Router();

router.get("", getRelations);
router.post("", addRelation);
router.delete("", deleteRelation);

export default router;
