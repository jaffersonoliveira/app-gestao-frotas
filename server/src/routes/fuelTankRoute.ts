import { Router } from "express";
import { handleReq } from "./handleReq";
import { getFuelTankController } from "../controllers/fuelTankController";

const router = Router();

router.get("/", async (req, res) => handleReq(req, res, getFuelTankController));

export default router;
