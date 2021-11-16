// dependency classes
const ResponseHandler = require('../handlers/responseHandling/responseHandler')
const ResponseCodes = require('../handlers/responseHandling/responseCodes/responseCodes')
const ResponseObject = require('../handlers/responseHandling/responseObject');
const { getTokenPayload } = require('../handlers/tokenHandler')

class EndpointBaseClass {
    constructor(){
        // Object vars
        this.getTokenPayload = getTokenPayload
        this.responseHandler = new ResponseHandler()
        this.codes = new ResponseCodes()
        this.log
    }

    getDb(req) {
        return req.app.settings.postgresDb;
    }

    setLogger(className){
        const log = require('../utilities/appLogger')(className)
        this.log = log
    }
}

module.exports = EndpointBaseClass