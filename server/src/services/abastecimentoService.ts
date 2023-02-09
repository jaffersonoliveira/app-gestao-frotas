import { IPostAbastecimento } from "../@types/abastecimento";
import { getSupply, postAbastecimento } from "../datas/abastecimentoData";

export async function postAbastecimentoService(datas: IPostAbastecimento) {
  let response: Object;
  try {
    const res = await postAbastecimento(datas);
    response = { success: true, message: "success", data: res };
  } catch (error) {
    console.log(error);
    response = { success: false, message: "erro ao lançar abastecimento", data: error };
  }
  return response;
}

export async function getSupplyService() {
  let response: Object;
  try {
    const res = await getSupply();
    response = { success: true, message: "success", data: res };
  } catch (error) {
    console.log(error);
    response = { success: false, message: "erro ao buscar abastecimentos", data: error };
  }
  return response;
}
