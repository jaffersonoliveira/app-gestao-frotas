import { Router } from "express";
import { handleReq } from "./handleReq";
import { getFuelController } from "../controllers/fuelController";

const router = Router();

router.get("/", async (req, res) => handleReq(req, res, getFuelController));

export default router;
