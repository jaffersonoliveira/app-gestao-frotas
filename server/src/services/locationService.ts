import { getLocation } from "../datas/locationData";

export async function getLocationService() {
  let response: Object;
  try {
    const res = await getLocation();
    response = { success: true, message: "success", data: res };
  } catch (err) {
    console.log(err);
    response = { success: false, message: "erro ao buscar localizações", data: err };
  }
  return response;
}
