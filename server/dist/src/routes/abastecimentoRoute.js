"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const handleReq_1 = require("./handleReq");
const abastecimentoController_1 = require("../controllers/abastecimentoController");
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleReq_1.handleReq)(req, res, abastecimentoController_1.postAbastecimentoController); }));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleReq_1.handleReq)(req, res, abastecimentoController_1.getSupplyController); }));
router.get("/lastkm/:vehicleId", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return (0, handleReq_1.handleReq)(req, res, abastecimentoController_1.getLastKmController); }));
exports.default = router;
