const appName = require('../../../package.json').name
const log4js = require('log4js')

// setup levels
const infoLog = new log4js.getLogger(appName)
infoLog.level = 'info'

class UtilitiesBase {
    constructor(){
    }

    info(msg){
        infoLog(msg)
    }
}

module.exports = UtilitiesBase