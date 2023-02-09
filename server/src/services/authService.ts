import { createHash } from "crypto";
import { get } from "../datas/genericDatas";

export async function postAuthService(datas: { user: string; pwd: string }) {
  let response: Object;
  try {
    let pwdHash = createHash("md5").update(datas.pwd).digest("hex");
    const res = await get(["*"], "sec_users", `where login ='${datas.user}' and pswd = '${pwdHash}' and app`);
    if (res.length > 0) {
      response = { success: true, message: "success", data: [] };
    } else {
      response = { success: false, message: "usuário ou senha incorreto", data: [] };
    }
  } catch (error) {
    console.log(error);
    response = { success: false, message: "erro na autenticação", data: error };
  }
  return response;
}
