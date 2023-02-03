import express, { Request, Response, Errback, NextFunction } from "express";
import { config as dotenv } from "dotenv";
import abastecimento from "../server/src/routes/abastecimentoRoute";

dotenv({ path: process.env.NODE_ENV === "production" ? ".env" : ".env.testing" });

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/abastecimento", abastecimento);

app.use((error: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at ${process.env.HOST}:${port}`);
});
