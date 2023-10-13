export class Exception extends Error {
    message = "Failed";
    code = 500;
    error = {};

    constructor(message, code, err = {}) {
        super(message);
        this.code = code;
        this.message = message;
        this.error = err;
    }
}
