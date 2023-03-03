import database from "../../db";

export async function getVehicles() {
  const queryString = `
    select veiculos.idveiculo, veiculos.placa, veiculos.veiculo, combustiveis.idcombustivel, combustiveis.combustivel, combustiveis.preco as preco_combustivel 
    from veiculos 
    left join combustiveis on veiculos.idcombustivel = combustiveis.idcombustivel`;
  const [rows] = await database.query(queryString);
  return rows;
}
