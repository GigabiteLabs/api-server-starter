const log = require('../../utilities/Logger')('responseObject')
const omitNullAttributes = require('../../utilities/omit-null-attributes')

// Basic Response Object Model
class ResponseObject {
  constructor(res) {
    if (!res) {
      log.log('FATAL ERROR: NO RES PASSED TO RESPONSE OBJECT')
      process.exit()
    }

    // Dependencies
    this.codes = require('./http-codes')

    // Vars
    this.message = ''
    this.statusCode = ''
    this.data = ''
    this.error = false
    this.res = res

    //************************************/
    //  Success / Error Handling Responses
    //************************************/
    this.success = async function (data, msg) {
      log.info('sending success response')
      try {
        this.data = await this.processReturnData(data)
        // never send empty data response in api v1.5^
        if (!this.data) {
          delete this.data
        }
        this.error = false
        this.statusCode = this.codes.success
        this.message = msg || this.codes.message(this.statusCode)
        this.send()
      } catch (e) {
        this.failure(e)
      }
    }

    this.unexpectedError = function (error, devMode) {
      log.error(error)
      this.error(error.message || 'An unexpected error occurred.', this.codes.serverError)
    }

    // This function requires a code to be passed in from the caller
    // to convey the actual context of the error
    this.error = function (message, code) {
      log.warn('sending error response')
      log.debug(`message: ${message}, code: ${code}`)
      try {
        if (!code) {
          code = this.codes.unprocessable // fallback on catchall if unknown code
        }
        this.data = {}
        this.error = true
        this.statusCode = code
        this.message = message || this.codes.message(this.statusCode)
        this.send()
      } catch (e) {
        this.failure(e)
      }
    }
    //******************************/
    //  All other error states
    //******************************/
    this.failedAuth = function (msg) {
      log.warn('authentication failed')
      try {
        // Set vars
        this.statusCode = this.codes.failedAuth
        this.error = true
        this.message = msg || this.codes.message(this.statusCode)
        this.data = {}
        this.send()
      } catch (e) {
        this.failure(e)
      }
    }

    this.invalidToken = function () {
      log.warn('invalid token')
      try {
        // Set vars
        this.statusCode = this.codes.failedAuth
        this.message = this.codes.message(this.statusCode)
        this.data = {}
        this.error = true
        this.send()
      } catch (e) {
        this.failure(res, e)
      }
    }

    this.invalidParams = function (msg) {
      log.warn('invalid params')
      try {
        // Set vars
        this.statusCode = this.codes.invalidParams
        this.message = msg || this.codes.message(this.statusCode)
        this.data = {}
        this.error = true
        this.send()
      } catch (e) {
        this.failure(res, e)
      }
    }

    // For any kind of server / system error
    this.failure = function (passedObj, data) {
      log.error(`SERVER FAILURE: ${passedObj}`)
      try {
        // Set vars
        this.statusCode = this.codes.serverError
        this.error = true
        this.message = passedObj || this.codes.message(this.statusCode)
        this.data = data || {}
        this.send()
      } catch (e) {
        log.error(`UHANDLED SERVER ERROR: ${e}`)
      }
    }
    log.trace('responseObject instantiated')
  }

  // Sends the data on this class as a response
  send() {
    log.info('sending response..')

    this.res.status(this.statusCode).json(this.toJSON())
    // todo: this should be conditionally enabled by an env variable in order to keep test output clean
    // log entire response for local debugging
    // log.trace(`sent response:\n\n${JSON.stringify(this.toJSON())}\n\n`)
    log.trace(`response sent.`)
  }
  // Returns JSON representation of this class
  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      error: this.error,
      data: this.data,
    }
  }
  // processes data for success responses
  // eliminating all null data, arrays
  // objects or empty attributes
  async processReturnData(data) {
    switch (Array.isArray(data) == true) {
    case true:
      let resData = []
      for(let object in data) {
        resData.push(await omitNullAttributes(data[object]))
      }

      // omit any empty arrays
      if(resData.length > 0) {
        // if a single-member array
        // return just the object, which
        // is according to our API standards
        return resData.length == 1 ? resData[0] : resData // else array
      } else {
        return undefined
      }
    case false:
      // handle returns for each
      // datatype that should be 
      // omitted
      switch (typeof(data)) {

      // omit boolean literals
      case 'boolean':
        return undefined
      
      // check objects
      case 'object':
        // omit empty objects  
        if (Object.keys(data).length <= 0) {
          return undefined
        } else {
          return await omitNullAttributes(data) 
        }
      }
    // omit string literals
    case 'string': 
      return undefined
    default:
      return undefined
    }
  }
}

module.exports = ResponseObject
