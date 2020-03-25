export default class HttpError implements Error {
    constructor(message: string, status: number = 500) {
        this.message = message;
        this.status = status;
    }

    name: string;
    message: string;
    stack?: string;
    status: number;
}
