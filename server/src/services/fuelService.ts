import { getFuels } from "../datas/fuelData";

export async function getFuelService() {
  let response: Object;
  try {
    const res = await getFuels();
    response = { success: true, message: "success", data: res };
  } catch (err) {
    console.log(err);
    response = { success: false, message: "erro ao buscar combustíveis", data: err };
  }
  return response;
}
