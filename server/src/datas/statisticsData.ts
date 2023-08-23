import database from "../../db";

export async function getStatistics() {
    const queryGetSuppliesQtde = `select count(*) total from abastecimento`;
    const queryGetSuppliesValue = `select sum(quant*preco) total from abastecimento`;
    const queryGetVehicles = `select count(*) total from veiculos`;
    const queryGetTanksQtde = `select count(*) total from tanques`;
    const queryGetTanksValue = `select sum(saldo) total from tanques`;

    const suppliesQtde = (await database.query(queryGetSuppliesQtde))[0];
    const suppliesValue = (await database.query(queryGetSuppliesValue))[0];
    const vehicles = (await database.query(queryGetVehicles))[0];
    const tanksQtde = (await database.query(queryGetTanksQtde))[0];
    const tanksValue = (await database.query(queryGetTanksValue))[0];

    return {suppliesQtde, suppliesValue, vehicles, tanksQtde, tanksValue};
  }
  