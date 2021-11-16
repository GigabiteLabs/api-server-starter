const log = require('../Logger')('jwt-util')
const JWTPortion = require('./JWTPortion')

const base64toJSON = (sourceString, skipReplace = false) => {
    // input / output format types
    const fromFormat = 'base64'
    const toFormat = 'ascii'

    // setup operating vars
    let operatingStr, buf, bufString
    // handle while skipping replacement, if specified
    switch(skipReplace == true) {
    case true:
        operatingStr = sourceString
        // convert & return
        buf = new Buffer.from(operatingStr, fromFormat)
        bufString = buf.toString(toFormat)
        return { encryptedSig: bufString }
    case false:
        operatingStr = sourceString.replace(/-/g, '+').replace(/_/g, '/')
        // convert & return
        buf = new Buffer.from(operatingStr, fromFormat)
        bufString = buf.toString(toFormat)
        return JSON.parse(bufString)
    }
}

async function JWTDecode(token, portion = JWTPortion.PAYLOAD ){
    // debugging
    log.trace(`attempting to decode JWT`)
    // return promise
    return new Promise(function(resolve,reject){
        try{

            // setup decoding values
            const base64Split = token.split('.')

            // validate token split length
            if(base64Split.length != 3) {
                throw `invalid token segment length: ${base64Split.length}`
            }

            // debugging
            log.trace(`extracting JWT portion: ${portion}`)

            // set portionIndex variable
            // and set index by portion option
            let portionIndex
            switch(portion) {
            case JWTPortion.HEADER:
                portionIndex = 0
                break
            case JWTPortion.PAYLOAD:
                portionIndex = 1
                break
            case JWTPortion.SIGNATURE:
                portionIndex = 2
                break
            }

            // get portion item from the jwt
            let splitItem = base64Split[portionIndex]

            // convert to raw JSON
            // passing a value for whether to skip
            // replacement of JWT chars
            let convertedJSON = base64toJSON(splitItem, (portion == JWTPortion.SIGNATURE))

            // final validation that it was non-null, non-empty
            switch (convertedJSON && convertedJSON != {} && convertedJSON != null) {
            case true:
                // resolve
                resolve(convertedJSON)
            case false:
                throw `token portion '${portion}'' could not be converted to JSON`
            }
        }catch (e){
            reject(`error decoding token-- ${e}`)
        }
    })
}

module.exports = JWTDecode