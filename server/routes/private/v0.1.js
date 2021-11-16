const express = require('express')

const createRouter = (demoEndpoints) => {
    // setup router
    const router = express.Router()
    
    // /demo endpoints
    router.get('/demo', (req, res) => demoEndpoints.processGetRequest(req, res) )
    
    // return instance
    return router
}

module.exports = createRouter