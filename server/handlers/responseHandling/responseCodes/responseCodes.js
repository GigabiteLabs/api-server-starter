// Standard V1 response codes
class ResponseCodes {
    constructor(){
    // Codes
        // 2xx
        this.success = 200
        this.noContent = 204

        // 4xx
        this.invalidParams = 400
        this.badRequest = 400
        this.failedAuth = 401 // authentication
        this.failedAuthz = 403
        this.notFound = 404
        this.notAllowed = 405
        this.conflict = 409
        this.imATeapot = 418
        this.unprocessable = 422

        // 5xx
        this.serverError = 500


        /// Returns the string description of the error code
        this.statusMessage = function(code){
            switch(code) {
                case 200:
                    return ('success')
                case 204:
                    return ('no content found for request')
                case 400:
                    return ('bad request')
                case 401:
                    return ('authentication failed')
                case 405:
                    return ('access not allowed to resource')
                case 409:
                    return ('there was a conflict while processing this request')
                case 418:
                    return ('i am a teapot, and that is not allowed. this should not be happening, contact the API developer ASAP and provide your logs')
                case 422:
                    return ('unprocessable request')
                case 500:
                    return ('unkown or unhandled server error, contact the API developer with logs')
                default:
                    return ('this status code is not yet implemented or supported')
            }
        }
    }

    // Returns this class as JSON
    toJSON(){
        return{
            // 2xx
            success: this.success,
            noContent: this.noContent,

            // 4xx
            invalidParams: this.invalidParams = 400,
            failedAuth: this.failedAuth = 401,
            notAllowed: this.notAllowed = 405,
            conflict: this.conflict = 409,
            imATeapot: this.imATeapot = 418,

            //5xx
            serverError: this.serverError,
        }
    }
}

module.exports = ResponseCodes
