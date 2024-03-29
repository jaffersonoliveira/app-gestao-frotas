import { Router } from "express";
import { handleReq } from "./handleReq";
import { getStatisticsController } from "../controllers/statisticsController";
const router = Router();

router.get("/", async (req, res) => handleReq(req, res, getStatisticsController));

export default router;
