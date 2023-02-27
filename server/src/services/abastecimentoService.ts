import { IPostAbastecimento } from "../@types/abastecimento";
import { getSupply, postAbastecimento } from "../datas/abastecimentoData";

export async function postAbastecimentoService(supplies: IPostAbastecimento[]) {
  let response: Object[] = [];
  for (let supply of supplies) {
    try {
      let res = await postAbastecimento(supply);
      response.push({ success: true, message: "success", data: res });
    } catch (error) {
      console.log(error);
      response.push({ success: false, message: "erro ao lançar abastecimento", data: error });
    }
    return response;
  }
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
