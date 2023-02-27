import { createHash } from "crypto";
import { get } from "../datas/genericDatas";
import { RowDataPacket } from "mysql2";

interface IReturn extends RowDataPacket {
  name: string;
  cargo: string;
}

export async function postAuthService(datas: { user: string; pwd: string }) {
  let response: Object;
  try {
    let pwdHash = createHash("md5").update(datas.pwd).digest("hex");
    const res = await get<IReturn>(["*"], "sec_users", `where login ='${datas.user}' and pswd = '${pwdHash}' and app`);
    if (res.length > 0) {
      response = { success: true, message: "success", data: { name: res[0].name, function: res[0].cargo } };
    } else {
      response = { success: false, message: "usuário ou senha incorreto", data: [] };
    }
  } catch (error) {
    console.log(error);
    response = { success: false, message: "erro na autenticação", data: error };
  }
  return response;
}
