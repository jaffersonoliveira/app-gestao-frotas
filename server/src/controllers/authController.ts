import * as Yup from "yup";
import { pt } from "yup-locale-pt";
import { Request } from "express";
import { postAuthService } from "../services/authService";
Yup.setLocale(pt);

export async function postAuthController(req: Request) {
  const data = req.body;
  console.log(data);
  const validationSchema = Yup.object({
    user: Yup.string().required().label("user"),
    pwd: Yup.string().required().label("pwd"),
  });

  validationSchema.validateSync(data);
  return postAuthService(data);
}
