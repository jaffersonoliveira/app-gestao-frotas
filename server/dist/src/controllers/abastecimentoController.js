"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getLastKmController = exports.getSupplyController = exports.postAbastecimentoController = void 0;
const Yup = __importStar(require("yup"));
const yup_locale_pt_1 = require("yup-locale-pt");
const abastecimentoService_1 = require("../services/abastecimentoService");
Yup.setLocale(yup_locale_pt_1.pt);
function postAbastecimentoController(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        const validationSchema = Yup.array()
            .min(1)
            .of(Yup.object({
            data: Yup.date().required().label("data"),
            idveiculo: Yup.number().integer().positive().required().label("id_veiculo"),
            idcombustivel: Yup.number().required().label("idcombustivel"),
            preco: Yup.number().required().label("preco"),
            quant: Yup.number().required().label("quant"),
            hodo_hori_pos: Yup.number().positive().label("hodo_hori_pos"),
            hodo_hori_ant: Yup.number().label("hodo_hori_ant"),
            total_abastecimento: Yup.number().required().label("total_abastecido"),
            tipo: Yup.string().label("tipo"),
            veiculo: Yup.string().label("veiculo"),
            modelo: Yup.string().label("modelo"),
        }));
        validationSchema.validateSync(data);
        return (0, abastecimentoService_1.postAbastecimentoService)(data);
    });
}
exports.postAbastecimentoController = postAbastecimentoController;
function getSupplyController() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, abastecimentoService_1.getSupplyService)();
    });
}
exports.getSupplyController = getSupplyController;
function getLastKmController(req) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.params;
        const validationSchema = Yup.object({
            vehicleId: Yup.number().integer().required().label("vehicleId"),
        });
        validationSchema.validateSync(data);
        return (0, abastecimentoService_1.getLastKmService)(data);
    });
}
exports.getLastKmController = getLastKmController;
