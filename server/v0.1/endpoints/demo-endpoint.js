const EndpointBase = require('../lib/endpoint-base')

class DemoEndpoint extends EndpointBase {
    constructor(demoService) {
        super()
        this.service = demoService
        this.setLogger('DemoEndpoint')
        this.log.trace('DemoEndpoint instantiated')
    }

    // **************************
    //     GET Operations
    //**************************
    /**
     * Recieves all `GET` method requests recieved by `Express`
     * on `/users` endpoint routes.
     *  
     * @param {Request} req - the `Request` instance passed by the `Express` router.
     * @param {Response} res - the `Response` instance passed by the `Express` router.
     */
     async processGetRequest(req, res) {
        try {
            let data = await this.service.getData()
            this.successResponse(res, data)
        } catch(e) {
            this.errorResponse(res, 500, e)
        }
     }
}

module.exports = DemoEndpoint