import { getFuelService } from "../services/fuelService";

export async function getFuelController() {
  return getFuelService();
}
