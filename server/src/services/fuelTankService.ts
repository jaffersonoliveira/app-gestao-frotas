import { getFuelTanks } from "../datas/fuelTankData";

export async function getFuelTankService() {
  let response: Object;
  try {
    const res = await getFuelTanks();
    response = { success: true, message: "success", data: res };
  } catch (err) {
    console.log(err);
    response = { success: false, message: "erro ao buscar tanques de combustíveis", data: err };
  }
  return response;
}
