import { getWorkRecord } from "../../../src/services/stat-manager";

describe("Test getWorkRecord", () => {
    it("should return work record", async () => {
        const workRecord = await getWorkRecord(
            "workerId",
            "2024-12-10",
        );

        expect(workRecord).toEqual({
            workerId: "workerId",
            dateString: "2024-12-10",
            workHours: 40,
        });
    });
});
