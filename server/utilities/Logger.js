var log4js = require('log4js');

module.exports = (className) => {
    var logger = log4js.getLogger(className);
    logger.level = process.env.LOG_LEVEL || 'info'
    return logger
}