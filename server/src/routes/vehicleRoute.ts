import { Router } from "express";
import { handleReq } from "./handleReq";
import { getVehicleController } from "../controllers/vehicleController";
const router = Router();

router.get("/", async (req, res) => handleReq(req, res, getVehicleController));

export default router;
