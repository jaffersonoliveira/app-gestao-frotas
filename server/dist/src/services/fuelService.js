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
exports.getFuelService = void 0;
const fuelData_1 = require("../datas/fuelData");
function getFuelService() {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            const res = yield (0, fuelData_1.getFuels)();
            response = { success: true, message: "success", data: res };
        }
        catch (err) {
            console.log(err);
            response = { success: false, message: "erro ao buscar combustíveis", data: err };
        }
        return response;
    });
}
exports.getFuelService = getFuelService;
