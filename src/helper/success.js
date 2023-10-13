export class SuccessResponse {
    success = true;
    code = 200;
    message = "Success";
    data = {};

    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
