// Reusable vars for new objs
let ResponseObject = require('./responseObject')
const log = require('../../utilities/appLogger')('responseHandler')

class ResponseHandler {
    constructor(){
        // Dependencies
        let ResponseCodes = require('./responseCodes/responseCodes')
        this.codes = new ResponseCodes()
        this.log = log
        this.log.trace('responseHandler instantiated')
    }

    //******************************/
    //  Various Errors
    //******************************/
    async failedAuth(res){
        log.warn('sending failed auth response')
        try {
            let code = this.codes.failedAuth
            let resObj = new ResponseObject('invalid credentials',code,{},true)
            res.status(code).json(resObj)
        }catch(e){
            this.failure(res, e)
        }
    }

    async invalidToken(res){
        try {
            let code = this.codes.failedAuth
            let resObj = new ResponseObject('invalid token',code,{},true)
            res.status(code).json(resObj)
        }catch(e){
            this.failure(res, e)
        }
    }

    async invalidParams(res, msg){
        try {
            let code = this.codes.invalidParams
            let resObj = new ResponseObject( msg || 'invalid params' ,code,{},true)
            res.status(code).json(resObj)
        }catch(e){
            this.failure(res, e)
        }
    }
    
    // For any kind of server / system error
    async failure (res, passedObj, data){
        this.log.error(`SERVER FAILURE: object passed, ${passedObj}`)
        try {
            let code = this.codes.serverError
            // Process with custom message or fallback 'unkown' msg, & fallback empty data
            let failObj = new ResponseObject(passedObj || 'unknown internal server error', code, data || {}, true)
            res.status(code).json(failObj)
        }catch(e){
            this.log.error(`UHANDLED SERVER ERROR: ${e}`)
        }
    }

    //************************************/
    //  Success / Error Handling Responses
    //************************************/
    async success(res, data){
        this.log.info('sending success response: '+res)
        try {
            this.log.info('sending success response: '+res)
            let resObject = new ResponseObject('success',this.codes.success,data,false)
            res.status(this.codes.success).json(resObject)
        }catch(e){
            this.failure(res, e)
        }
    };
    
    // This function requires a code to be passed in from the caller 
    // to convey the actual context of the error
    error(res, message, code){
        this.log.log('sending error response')
        try{
            if(!code){
                code = this.codes.imATeapot // fallback on catchall if unknown code
            }
            new ResponseObject(res,message,code,{},true).send()
        }catch(e){
            this.failure(res, e)
        }
    }
}

module.exports = ResponseHandler

