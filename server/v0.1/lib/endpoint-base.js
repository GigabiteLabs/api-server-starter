// dependency classes
const ResponseCodes = require('../../handlers/responseHandling/http-codes')
const Response = require('../../handlers/responseHandling/responseObject');
const JWTDecode = require('../../utilities/jwt/JWTDecode')

class EndpointBase {
    constructor(){
        // Object vars
        this.JWTDecode = JWTDecode
        this.codes = new ResponseCodes()
        this.log
    }

    getDb(req) {
        return req.app.settings.postgresDb;
    }

    setLogger(className){
        const log = require('../../utilities/Logger')(className)
        this.log = log
    }

    internalErrorResponse(res, error) {
        this.handleError(res, error)
    }

    successResponse(res, data) {
        new Response(res).success(data)
    }

    resourceNotFoundResponse(res) {
        let code = this.codes.notFound
        new Response(res).error(this.codes.message(code), code)
    }

    noContentFoundResponse(res) {
        let code = this.codes.noContent
        new Response(res).error(this.codes.message(code), code)
    }

    unprocessableRequest(msg, res) {
        let code = this.codes.unprocessable
        new Response(res).error(`${this.codes.message(code)}: ${msg}`, code)
    }

    errorResponse(res, code, message) {
        res.status(code).json({ message })
    }
}

module.exports = EndpointBase