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
exports.get = exports.post = exports.buildValuesIndexSql = exports.buildColumnNamesSql = void 0;
const db_1 = __importDefault(require("../../db"));
function buildColumnNamesSql(datas) {
    return Object.keys(datas).toString();
}
exports.buildColumnNamesSql = buildColumnNamesSql;
function buildValuesIndexSql(datas) {
    let valuesIndex = "";
    Object.values(datas).forEach((e, index, array) => (valuesIndex += `?${+(index + 1) < array.length ? "," : ""}`));
    return valuesIndex;
}
exports.buildValuesIndexSql = buildValuesIndexSql;
function post(tableName, datas) {
    return __awaiter(this, void 0, void 0, function* () {
        const columnNames = buildColumnNamesSql(datas);
        const valuesIndex = buildValuesIndexSql(datas);
        const queryString = `insert into ${tableName}(${columnNames}) values (${valuesIndex})`;
        const [response] = yield db_1.default.query(queryString, Object.values(datas));
        return response;
    });
}
exports.post = post;
function get(columns, tableName, filters) {
    return __awaiter(this, void 0, void 0, function* () {
        const queryString = `select ${columns.toString()} from ${tableName} ${filters !== null && filters !== void 0 ? filters : ""}`;
        const [rows] = yield db_1.default.query(queryString);
        return rows;
    });
}
exports.get = get;
/* interface abastecimento extends RowDataPacket {
  data: Date;
}

async function main() {
  const response = await get<abastecimento>("abastecimento");
  console.log(response[0].data);
}

main(); */
