import { IPostAbastecimento } from "../@types/abastecimento";
import { post } from "./genericDatas";
import database from "../../db";

export async function postAbastecimento(datas: IPostAbastecimento) {
  return post("abastecimento", datas);
}

export async function getSupply() {
  const queryString = `
    select 
      abastecimento.*, 
      veiculos.placa, 
      veiculos.veiculo desc_veiculo 
    from abastecimento 
    left join veiculos 
      on abastecimento.idveiculo = veiculos.idveiculo 
    order by data desc
    limit 100`;
  const [rows] = await database.query(queryString);
  return rows;
}

export async function getLastKm(vehicleId: number) {
  const queryString = `
    select 
      hodo_hori_pos km
    from abastecimento
    where idveiculo = ${vehicleId}
    order by data desc 
    limit 1;
  `;
  const [rows] = await database.query(queryString);
  return rows;
}
