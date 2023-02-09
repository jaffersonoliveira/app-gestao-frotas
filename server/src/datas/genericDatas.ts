import { OkPacket, RowDataPacket } from "mysql2";
import database from "../../db";

export function buildColumnNamesSql(datas: Object): string {
  return Object.keys(datas).toString();
}

export function buildValuesIndexSql(datas: Object) {
  let valuesIndex = "";
  Object.values(datas).forEach((e, index, array) => (valuesIndex += `?${+(index + 1) < array.length ? "," : ""}`));
  return valuesIndex;
}

export async function post(tableName: string, datas: Object) {
  const columnNames = buildColumnNamesSql(datas);
  const valuesIndex = buildValuesIndexSql(datas);
  const queryString = `insert into ${tableName}(${columnNames}) values (${valuesIndex})`;
  const [response] = await database.query<OkPacket[]>(queryString, Object.values(datas));
  return response;
}

export async function get<T extends RowDataPacket>(columns: string[], tableName: string, filters?: string): Promise<T[]> {
  const queryString = `select ${columns.toString()} from ${tableName} ${filters ?? ""}`;
  const [rows] = await database.query<T[]>(queryString);
  return rows;
}

/* interface abastecimento extends RowDataPacket {
  data: Date;
}

async function main() {
  const response = await get<abastecimento>("abastecimento");
  console.log(response[0].data);
}

main(); */
