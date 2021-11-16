const Base = require('../../baseClasses/endpointBaseClass');
const ResponseObject = require('../../handlers/responseHandling/responseObject');

class PulseAudio extends Base {
    constructor(){
	    super()
	    this.setLogger('PulseAuio')
	    this.log.trace('PulseAudio Endpoint Instantiated')
    }

    async test(req, res) {
        this.log.info("called test")
        new ResponseObject(res).success({},'hello there')
    }
}

module.exports = PulseAudio