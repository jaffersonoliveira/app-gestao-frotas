import { Request, Response } from "express";
import { ValidationError } from "yup";

export async function handleReq(req: Request, res: Response, controlerFunction: Function) {
  try {
    const response = await controlerFunction(req);
    res.json(response);
  } catch (erro) {
    console.log(erro);
    if (erro instanceof ValidationError) {
      res.status(400).json(erro.errors);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}
