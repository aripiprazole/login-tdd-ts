import Chalk from "chalk";
import getCurrentDate from "./getCurrentDate";

type LogType = "error" | "info" | "warn" | "debug";

interface LogMethod {
    who?: string;
    type?: LogType;
    args: any[];
    color: Chalk.Chalk;
    messageColor: Chalk.Chalk;
}

export interface ILog {
    info(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
    log(args: LogMethod): void;
}

const Logger: ILog = {
    info(...args) {
        this.log({
            type: "info",
            color: Chalk.bgBlue,
            messageColor: Chalk.blue,
            args
        });
    },
    warn(...args) {
        this.log({
            type: "warning",
            color: Chalk.bgYellow,
            messageColor: Chalk.yellow,
            args
        });
    },
    error(...args) {
        this.log({
            type: "error",
            color: Chalk.bgRed,
            messageColor: Chalk.red,
            args
        });
    },
    log({ who = "app", type = "info", color, messageColor, args }) {
        console.log(
            `${color(
                `[${getCurrentDate()}] [${who.toUpperCase()}] [${type.toUpperCase()}]`
            )} `,
            messageColor(...args)
        );
    }
};

export default Logger;
