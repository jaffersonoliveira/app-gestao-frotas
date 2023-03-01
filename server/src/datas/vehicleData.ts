import database from "../../db";

export async function getVehicles() {
  const queryString = `
    select veiculos.idveiculo, veiculos.placa, veiculos.veiculo, veiculos.combustivel, combustiveis.preco  
    from veiculos 
    left join combustiveis on veiculos.combustivel = combustiveis.combustivel`;
  const [rows] = await database.query(queryString);
  return rows;
}
