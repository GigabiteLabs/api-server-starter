
class DemoRepository {
    constructor() {
        // setup some database connections
        // if necessary

        // for now, test data
        this.demoData = { message: "yo sup" }
    }

    // gets data from data store
    getData() {
        return this.demoData
    }
}

module.exports = DemoRepository