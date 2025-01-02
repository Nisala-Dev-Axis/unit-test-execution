import getMonthlyStats from "../../src/functions/getMonthlyStats";
import { WorkStatus } from "../../src/functions/types/enum";

describe("Test getMonthlyStats", () => {
    it("should return monthly stats", async () => {
        const result = await getMonthlyStats(
            "2024-10-12",
            {
                maxWorkHours: 50,
                workerId: "worker1",
                workHours: 25,
            },
        );
        expect(result).toEqual({
            dateString: "2024-10-12",
            workPercentage: 50,
            workStatus: WorkStatus.DECREASED,
        })
    });
});
