import { get } from "./genericDatas";

export async function getLocation() {
  return get(["*"], "localizacoes");
}
