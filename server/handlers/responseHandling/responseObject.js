const log = require('../../utilities/appLogger')('responseObject')
// Basic Response Object Model
class ResponseObject {
    constructor(res){
        if(!res){
            log.log('FATAL ERROR: NO RES PASSED TO RESPONSE OBJECT')
            process.exit()
        }

        // Dependencies
        let ResponseCodes = require('./responseCodes/responseCodes')
        this.codes = new ResponseCodes()

        // Vars
        this.message = ''
        this.statusCode = ''
        this.data = ''
        this.error = false
        this.res = res

        //************************************/
        //  Success / Error Handling Responses
        //************************************/
        this.success = function(data, msg){
            log.info('sending success response')
            try {
                this.data = data || {}
                this.error = false
                this.statusCode = this.codes.success
                this.message = msg || this.codes.statusMessage(this.statusCode)
                this.send()
            }catch(e){
                this.failure(e)
            }
        }

        this.unexpectedError = function(error) {
            this.failure('An unexpected error occurred.', this.codes.serverError);
        };

        // This function requires a code to be passed in from the caller
        // to convey the actual context of the error
        this.error = function(message, code){
            log.warn('sending error response')
            try{
                if(!code){
                    code = this.codes.unprocessable // fallback on catchall if unknown code
                }
                this.data = {}
                this.error = true
                this.statusCode = code
                this.message = message || this.codes.statusMessage(this.statusCode)
                this.send()
            }catch(e){
                this.failure(e)
            }
        }
        //******************************/
        //  All other error states
        //******************************/
        this.failedAuth = function(msg){
            log.warn('authentication failed')
            try {
                // Set vars
                this.statusCode = this.codes.failedAuth
                this.error = true
                this.message = msg || this.codes.statusMessage(this.statusCode)
                this.data = {}
                this.send()
            }catch(e){
                this.failure(e)
            }
        }

        this.invalidToken = function(){
            log.warn('invalid token')
            try {
                // Set vars
                this.statusCode = this.codes.failedAuth
                this.message = this.codes.statusMessage(this.statusCode)
                this.data = {}
                this.error = true
                this.send()
            }catch(e){
                this.failure(res, e)
            }
        }

        this.invalidParams = function(msg){
            log.warn('invalid params')
            try {
                // Set vars
                this.statusCode = this.codes.invalidParams
                this.message = msg || this.codes.statusMessage(this.statusCode)
                this.data = {}
                this.error = true
                this.send()
            }catch(e){
                this.failure(res, e)
            }
        }

        // For any kind of server / system error
        this.failure = function(passedObj, data){
            log.error(`SERVER FAILURE: ${passedObj}`)
            try {
                // Set vars
                this.statusCode = this.codes.serverError
                this.error = true
                this.message = passedObj || this.codes.statusMessage(this.statusCode)
                this.data = data || {}
                this.send()
            }catch(e){
                log.error(`UHANDLED SERVER ERROR: ${e}`)
            }
        }
        log.trace('responseObject instantiated')
    }

    // Sends the data on this class as a response
    send(){
        log.info('sending response..')
        this.res.status(this.statusCode).json(this.toJSON())
    }

    // Returns JSON representation of this class
    toJSON(){
        return {
            message: this.message,
            statusCode: this.statusCode,
            error: this.error,
            data: this.data
        }
    }
}

module.exports = ResponseObject
