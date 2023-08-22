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
exports.postAuthService = void 0;
const crypto_1 = require("crypto");
const genericDatas_1 = require("../datas/genericDatas");
function postAuthService(datas) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            let pwdHash = (0, crypto_1.createHash)("md5").update(datas.pwd).digest("hex");
            const res = yield (0, genericDatas_1.get)(["*"], "sec_users", `where login ='${datas.user}' and pswd = '${pwdHash}' and app`);
            if (res.length > 0) {
                response = { success: true, message: "success", data: { name: res[0].name, function: res[0].cargo } };
            }
            else {
                response = { success: false, message: "usuário ou senha incorreto", data: [] };
            }
        }
        catch (error) {
            console.log(error);
            response = { success: false, message: "erro na autenticação", data: error };
        }
        return response;
    });
}
exports.postAuthService = postAuthService;
