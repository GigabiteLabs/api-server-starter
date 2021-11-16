const appName = require('./package').name
const log = require('./server/utilities/appLogger')(appName)
const http = require('http')
const https = require('https')
const helmet = require('helmet')
const log4js = require('log4js')
const uuid = require('uuid')
const express = require('express')
let cookieSession = require('cookie-session')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')


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
// public routes
app.use(
	'/api/v0.1/public',
	require('./server/routes/public/publicRouter')
)

// private routes
app.use(
	'/api/v0.1/private',
	require('./server/routes/private/v0.1Private')
)



// Setup server vars
const mode = process.env.mode
const port = process.env.PORT

// Trust proxies behind IBM Cloud reverse proxy
app.set('trust proxy', 1)

http.createServer(app).listen(port, async function(){
	log.info(`HTTP server listening on http://localhost:${port}`)
})


module.exports = app