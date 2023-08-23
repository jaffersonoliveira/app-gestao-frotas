import database from "../../db";

export async function getStatistics() {
    const queryGetSupplies = `select count(*) qtde, sum(quant*preco) total from abastecimento`;
    const queryGetVehicles = `select count(*) qtde from veiculos`;
    const queryGetTanks = `select count(*) qtde, sum(saldo) saldo from tanques`;

    const supplies = (await database.query(queryGetSupplies))[0];
    const vehicles = (await database.query(queryGetVehicles))[0];
    const tanks = (await database.query(queryGetTanks))[0];

    return {supplies, vehicles,tanks};
  }
  