const decodeToken = require('../utilities/decodeJWT')
const log = require('../utilities/appLogger')('tokenHandler')
// Returns a JSON token payload object
exports.getTokenPayload = async function (idToken){
    return new Promise(async function(resolve,reject){
        try{
            let tokenPayload = await decodeToken(idToken)
            resolve(tokenPayload)
        }catch (e){
            log.error(`token decoder failed with error: ${e}`)
            reject(e)
        }
    })
}