import { getLocationService } from "../services/locationService";

export async function getLocationController() {
  return getLocationService();
}