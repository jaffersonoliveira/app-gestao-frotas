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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastKm = exports.getSupply = exports.postAbastecimento = void 0;
const genericDatas_1 = require("./genericDatas");
const db_1 = __importDefault(require("../../db"));
function postAbastecimento(datas) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, genericDatas_1.post)("abastecimento", datas);
    });
}
exports.postAbastecimento = postAbastecimento;
function getSupply() {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = `
    select 
      abastecimento.*, 
      veiculos.placa, 
      veiculos.veiculo desc_veiculo 
    from abastecimento 
    left join veiculos 
      on abastecimento.idveiculo = veiculos.idveiculo 
    order by data desc
    limit 100`;
        const [rows] = yield db_1.default.query(queryString);
        return rows;
    });
}
exports.getSupply = getSupply;
function getLastKm(vehicleId) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = `
    select 
      hodo_hori_pos km
    from abastecimento
    where idveiculo = ${vehicleId}
    order by data desc 
    limit 1;
  `;
        const [rows] = yield db_1.default.query(queryString);
        return rows;
    });
}
exports.getLastKm = getLastKm;
