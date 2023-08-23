import database from "../../db";

export async function getStatistics() {
    const queryGetSuppliesQtde = `select count(*) total from abastecimento`;
    const queryGetSuppliesValue = `select concat('R$ ', convert(format(sum(total_abastecimento), 2, 'de_DE'), CHAR)) total from abastecimento`;
    const queryGetVehicles = `select count(*) total from veiculos`;
    const queryGetTanksQtde = `select count(*) total from tanques`;
    const queryGetTanksValue = `select convert(format(sum(saldo), 2, 'de_DE'), CHAR) total from tanques`;

    const suppliesQtde = (await database.query(queryGetSuppliesQtde))[0];
    const suppliesValue = (await database.query(queryGetSuppliesValue))[0];
    const vehicles = (await database.query(queryGetVehicles))[0];
    const tanksQtde = (await database.query(queryGetTanksQtde))[0];
    const tanksValue = (await database.query(queryGetTanksValue))[0];

    return {suppliesQtde, suppliesValue, vehicles, tanksQtde, tanksValue};
  }
  