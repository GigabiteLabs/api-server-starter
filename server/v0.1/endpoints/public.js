const Base = require('../lib/endpoint-base');
const ResponseObject = require('../../handlers/responseHandling/responseObject');

class PublicEndpoints extends Base {
    constructor(){
	    super()
	    this.setLogger('PublicEndpoints')
	    this.log.trace('PublicEndpoints Instantiated')
    }

    async getSomething(req, res) {
        this.log.info("called getSomething")
        new ResponseObject(res).success({},'hello there')
    }
}

module.exports = PublicEndpoints