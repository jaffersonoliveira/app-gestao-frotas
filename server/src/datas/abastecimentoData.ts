import { IPostAbastecimento } from "../@types/abastecimento";
import { post } from "./genericDatas";

export async function postAbastecimento(datas: IPostAbastecimento) {
  return post("abastecimento", datas);
}
