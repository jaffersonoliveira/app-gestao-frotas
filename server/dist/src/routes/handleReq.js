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
exports.handleReq = void 0;
const yup_1 = require("yup");
function handleReq(req, res, controlerFunction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield controlerFunction(req);
            res.json(response);
        }
        catch (erro) {
            console.log(erro);
            if (erro instanceof yup_1.ValidationError) {
                res.status(400).json(erro.errors);
            }
            else {
                res.status(500).send("Internal Server Error");
            }
        }
    });
}
exports.handleReq = handleReq;
