import { get } from "./genericDatas";

export async function getVehicles() {
  return get(["idveiculo", "placa", "veiculo", "combustivel"], "veiculos");
}
