import { Router } from "express";
import { handleReq } from "./handleReq";
import { postAbastecimentoController, getSupplyController, getLastKmController } from "../controllers/abastecimentoController";
const router = Router();

router.post("/", async (req, res) => handleReq(req, res, postAbastecimentoController));
router.get("/", async (req, res) => handleReq(req, res, getSupplyController));
router.get("/lastkm/:vehicleId", async (req, res) => handleReq(req, res, getLastKmController));

export default router;
