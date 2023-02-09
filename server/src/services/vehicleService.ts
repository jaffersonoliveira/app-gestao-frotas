import { getVehicles } from "../datas/vehicleData";

export async function getVehiclesService() {
  let response: Object;
  try {
    const res = await getVehicles();
    response = { success: true, message: "success", data: res };
  } catch (err) {
    console.log(err);
    response = { success: false, message: "erro ao lançar abastecimento", data: err };
  }
  return response;
}
