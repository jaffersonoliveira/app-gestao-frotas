import { Router } from "express";
import { handleReq } from "./handleReq";
import { postAuthController } from "../controllers/authController";
const router = Router();

router.post("/", async (req, res) => handleReq(req, res, postAuthController));

export default router;
