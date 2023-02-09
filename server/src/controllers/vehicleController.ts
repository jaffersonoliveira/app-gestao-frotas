import { getVehiclesService } from "../services/vehicleService";

export async function getVehicleController() {
  return getVehiclesService();
}
