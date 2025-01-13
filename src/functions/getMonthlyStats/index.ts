import { getWorkRecord } from "../../services/stat-manager";
import { WorkStatus } from "../types/enum";
import { IGetMonthlyStatsInput, IGetMonthlyStatsOutput } from "../types/interface";

/**
 * @param dateString the current date utc string
 * @param inputData 
 */
const getMonthlyStats = async (
    dateString: string,
    inputData: IGetMonthlyStatsInput,
): Promise<IGetMonthlyStatsOutput> => {
    const date = new Date(dateString);
    date.setMonth(date.getMonth() - 1);

    const { maxWorkHours, workHours, workerId } = inputData;
    const previousWorkRecord = await getWorkRecord(
        date.toISOString(),
        workerId,
    );
    const workPercentage = workHours / maxWorkHours * 100;
    const workStatus = 
        workHours > previousWorkRecord.workHours ? 
            WorkStatus.INCREASED : 
            workHours < previousWorkRecord.workHours ? 
                WorkStatus.DECREASED : 
                WorkStatus.NO_CHANGE;

    return {
        dateString: dateString.split("T")[0],
        workPercentage,
        workStatus,
    };
};

export default getMonthlyStats;
