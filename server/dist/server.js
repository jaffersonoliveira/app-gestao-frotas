"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const abastecimentoRoute_1 = __importDefault(require("./src/routes/abastecimentoRoute"));
const vehicleRoute_1 = __importDefault(require("./src/routes/vehicleRoute"));
const authRoute_1 = __importDefault(require("./src/routes/authRoute"));
const fuelRoute_1 = __importDefault(require("./src/routes/fuelRoute"));
(0, dotenv_1.config)({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.testing" });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use("/supply", abastecimentoRoute_1.default);
app.use("/vehicle", vehicleRoute_1.default);
app.use("/auth", authRoute_1.default);
app.use("/fuel", fuelRoute_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send("Internal Server Error");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${process.env.HOST}:${port}`);
});
