import { timeout } from "../../src/utils";

describe("Test timeout", () => {
    it("Should await the correct number of milliseconds", async () => {
        const startTime = new Date();
        await timeout(1000);
        const endTime = new Date();

        const timeDiff = Math.round(endTime.getTime() - startTime.getTime());
        expect(timeDiff).toBeLessThanOrEqual(1050);
    });

    it("Should await the correct number of milliseconds", async () => {
        const startTime = new Date();
        await timeout(500);
        const endTime = new Date();

        const timeDiff = Math.round(endTime.getTime() - startTime.getTime());
        expect(timeDiff).toBeLessThanOrEqual(550);
    });
});