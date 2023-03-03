import * as Yup from "yup";
import { pt } from "yup-locale-pt";
import { Request } from "express";
import { postAbastecimentoService, getSupplyService } from "../services/abastecimentoService";

Yup.setLocale(pt);

export async function postAbastecimentoController(req: Request) {
  const data = req.body;
  console.log(data);
  const validationSchema = Yup.array()
    .min(1)
    .of(
      Yup.object({
        data: Yup.date().required().label("data"),
        idveiculo: Yup.number().integer().positive().required().label("id_veiculo"),
        idcombustivel: Yup.number().required().label("idcombustivel"),
        preco: Yup.number().required().label("preco"),
        quant: Yup.number().required().label("quant"),
        total_abastecimento: Yup.number().required().label("total_abastecido"),
        tipo: Yup.string().label("tipo"),
        veiculo: Yup.string().label("veiculo"),
        modelo: Yup.string().label("modelo"),
      })
    );

  validationSchema.validateSync(data);
  return postAbastecimentoService(data);
}

export async function getSupplyController() {
  return getSupplyService();
}
