import { get } from "./genericDatas";

export async function getFuels() {
  return get(["*"], "combustiveis");
}
