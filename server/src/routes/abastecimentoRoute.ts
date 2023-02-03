import { Router } from "express";
import { handleReq } from "./handleReq";
import { postAbastecimentoController } from "../controllers/abastecimentoController";
const router = Router();

router.post("/", async (req, res) => handleReq(req, res, postAbastecimentoController));

export default router;
