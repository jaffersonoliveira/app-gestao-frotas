import { Router } from "express";
import { handleReq } from "./handleReq";
import { getLocationController } from "../controllers/locationController";

const router = Router();

router.get("/", async (req, res) => handleReq(req, res, getLocationController));

export default router;
