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
exports.getLastKmService = exports.getSupplyService = exports.postAbastecimentoService = void 0;
const abastecimentoData_1 = require("../datas/abastecimentoData");
function postAbastecimentoService(supplies) {
    return __awaiter(this, void 0, void 0, function* () {
        let response = [];
        for (let supply of supplies) {
            try {
                let res = yield (0, abastecimentoData_1.postAbastecimento)(supply);
                response.push({ success: true, message: "success", data: res });
            }
            catch (error) {
                console.log(error);
                response.push({ success: false, message: "erro ao lançar abastecimento", data: error });
            }
            return response;
        }
    });
}
exports.postAbastecimentoService = postAbastecimentoService;
function getSupplyService() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            const res = yield (0, abastecimentoData_1.getSupply)();
            response = { success: true, message: "success", data: res };
        }
        catch (error) {
            console.log(error);
            response = { success: false, message: "erro ao buscar abastecimentos", data: error };
        }
        return response;
    });
}
exports.getSupplyService = getSupplyService;
function getLastKmService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            const res = yield (0, abastecimentoData_1.getLastKm)(data.vehicleId);
            response = { success: true, message: "success", data: res };
        }
        catch (error) {
            console.log(error);
            response = { success: false, message: "erro ao buscar último km", data: error };
        }
        return response;
    });
}
exports.getLastKmService = getLastKmService;
