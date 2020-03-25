import createApp from "@app/app";
import Logger from "@app/utils/Logger";

describe("App tests", () => {
    it("should enable verbose and send log messages", async () => {
        const spy = spyOn(Logger, "info");
        await createApp(true);
        expect(spy).toBeCalled();
    });

    it("should send a custom log message with date, who executed, and the kind of message: info", async () => {
        const spy = spyOn(Logger, "info");
        Logger.info("Test log message");
        expect(spy).toBeCalled();
    });

    it("should send a custom log message with date, who executed, and the kind of message: error", async () => {
        const spy = spyOn(Logger, "error");
        Logger.error("Test log message");
        expect(spy).toBeCalled();
    });
});
