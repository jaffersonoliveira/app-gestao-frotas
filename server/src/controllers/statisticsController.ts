import { getStatisticsService } from "../services/statisticsService";

export async function getStatisticsController() {
    return getStatisticsService()
}