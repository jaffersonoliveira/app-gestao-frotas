import { getStatistics } from "../datas/statisticsData";

export async function getStatisticsService() {
    let response: Object;
    try {
      const res = await getStatistics();
      response = { success: true, message: "success", data: res };
    } catch (err) {
      console.log(err);
      response = { success: false, message: "erro ao buscar dados", data: err };
    }
    return response;
  }