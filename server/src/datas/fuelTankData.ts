import { get } from "./genericDatas";

export async function getFuelTanks() {
  return get(["*"], "tanques");
}
