import { WorkStatus } from "./enum";

export interface IGetMonthlyStatsInput {
    workerId: string;
    workHours: number;
    maxWorkHours: number;
};

export interface IGetMonthlyStatsOutput {
    dateString: string;
    workPercentage: number;
    workStatus: WorkStatus;
};
