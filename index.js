const appName = require('./package').name
const log = require('./server/utilities/Logger')(appName)
const http = require('http')
const helmet = require('helmet')
const log4js = require('log4js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

// api repositories
const DemoRepository_V0_1 = require('./server/v0.1/repositories/demo-repository')
const demoRepository_V0_1 = new DemoRepository_V0_1()

// api service layers
const DemoService_V0_1 = require('./server/v0.1/services/demo-service')
const demoService_V0_1 = new DemoService_V0_1(demoRepository_V0_1)

// api endpoints
const DemoEndpoint_V0_1 = require('./server/v0.1/endpoints/demo-endpoint')
const demoEndpoint_V0_1 = new DemoEndpoint_V0_1(demoService_V0_1)

// routers
const createRoutes_v0_1 = require('./server/routes/private/v0.1')
const router_v0_1 = createRoutes_v0_1(demoEndpoint_V0_1)

//*********************************************/
//  Middleware Configuration & setup
//*********************************************/
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

//*********************************************/
//  Logging, Server Startup,  404 & 500 Pages
//*********************************************/
app.use(log4js.connectLogger(log, { level: log.level }))


//*********************************************/
//  Route Configuration
//*********************************************/

// routes with root level configuration
app.use(require('./server/routes/public/v0.1'))

// explicitly named public routes
app.use(
	'/public/v0.1',
	require('./server/routes/public/v0.1')
)

// Endpoint Configuration

// api versioned routes
// notes: these must be implemented in
// descending order from high to low
// since routes are immutable after instantiation
app.use('/api/v0.1', router_v0_1)

// Setup server vars
const port = process.env.PORT

// Trust proxies behind IBM Cloud reverse proxy
app.set('trust proxy', 1)

http.createServer(app).listen(port, async function(){
	log.info(`HTTP server listening on http://localhost:${port}`)
})

module.exports = app