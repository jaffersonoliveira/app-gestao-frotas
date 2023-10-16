import { getFuelTankService } from "../services/fuelTankService";

export async function getFuelTankController() {
  return getFuelTankService();
}