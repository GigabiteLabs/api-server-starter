
const responseCodes = require('./ResponseHandling/responseCodes')
const resCodes = new responseCodes()
const { successResponse, errorResponse, failure} = require('./ResponseHandling/responseHandler')

exports.possibleCodes = async function(res){
    successResponse('all possible response codes',resCodes.toJSON(),res)
}