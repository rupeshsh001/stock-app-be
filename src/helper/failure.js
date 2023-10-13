export class FailureResponse {
    success = false;
    code = 500;
    message = "Failed";
    error = {};

    constructor(code, message, err = {}) {
        this.code = code;
        this.message = message;
        this.error = err;
    }
}
