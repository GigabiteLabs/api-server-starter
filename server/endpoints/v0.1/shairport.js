const Base = require('../../baseClasses/endpointBaseClass');
const ResponseObject = require('../../handlers/responseHandling/responseObject');

class Shairport extends Base {
    constructor(){
	    super()
	    this.setLogger('Shairport')
	    this.log.trace('Shairport Endpoint Instantiated')
    }

    async test(req, res) {
        this.log.info("called test")
        new ResponseObject(res).success({},'hello there')
    }
}

module.exports = Shairport