import { timeout } from "../../utils";
import { IDbWorkRecord } from "./types/interface";

export const getWorkRecord = async (
    workerId: string,
    dateString: string,
): Promise<IDbWorkRecord> => {
    await timeout(1000);

    return {
        workerId,
        dateString,
        workHours: 40,
    };
};
