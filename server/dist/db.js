"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.testing" });
const database = promise_1.default.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPWD,
    database: process.env.DATABASE,
    port: 3306,
});
exports.default = database;
