
class DemoService {
    constructor(demoRepository) {
        this.repository = demoRepository
        this.setLogger('DemoService')
        this.log.trace('DemoService instantiated')
    }

    setLogger(className){
        const log = require('../../utilities/Logger')(className)
        this.log = log
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
     async getData() {
        return this.repository.getData()
     }
}

module.exports = DemoService