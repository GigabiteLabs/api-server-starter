/** 
 * Class definition of all supported HTTP codes, 
 * associated messages & descrptions.
 * 
 * @note
 * - Use this class' static properties
 * to retrieve and handle HTTP codes for 
 * requests and responses.
 * 
 * @version v1.5
 * @since 1.5
 * @author Dan Burkhardt
 * @copyright © 2021 GigabiteLabs
 */
 class HTTPCodes {
    /**
    * The request was processed successfully.
    * @property {int}
    * @since 1.5
    */
    static success = 200
    /**
    * The request was successful, but no content was
    * found or available to return in the response.
    * @property {int}
    * @since 1.5
    */
    static noContent = 204
    /**
    * The request was recieved but it was malformed,
    * and could not be processed.
    * @property {int}
    * @note
    * - In general, if reason for the error is
    * unknown, use this code. 
    * - If the reason for the failure
    * is precisely known, use code `unprocessable (422)`.
    * @since 1.5
    */
    static badRequest = 400
    /**
    * The request is unauthorized due to 
    * failed authentication.
    * @property {int}
    * @since 1.5
    */
    static failedAuth = 401
    /**
    * The request is unauthorized due to 
    * failed 'authz' authentication.
    * @property {int}
    * @since 1.5
    */
    static failedAuthz = 403
    /**
    * The requested resource was not found or
    * does not exist.
    * @property {int}
    * @since 1.5
    */
    static notFound = 404

    /**
    * The request was recieved and authenticated, 
    * but the requestor lacks some other kind of 
    * permission to perform the requested action.
    * @property {int}
    * @note
    * - Most commonly, this applies when a user is 
    * authenticated but fais to meet the minimum 
    * `user_role` requirement for the operation.
    * 
    * - user role evaluation happens either in the
    * routing layer of the requested endpoint, 
    * or, for API v1.5 or higher, in the 
    * `${feature}-service` class.
    * @since 1.5
    */
    static notAllowed = 405
    /**
    * An attempt to perform the request would have
    * resulted in a conflict, so it was not executed.
    * @property {int}
    * @note
    * - The user should be presented with a prompt
    * noting that it was not performed
    * - Should the user re-attempt, the client will
    * have to pass an override or forcing parameter
    * or the same response will like result.
    * @since 1.5
    */
    static conflict = 409

    /**
    * The body payload of the request exceeded the
    * maximum allowable total size in bytes.
    * @property {int}
    * @since 1.5
    */
    static payloadTooLarge = 413
    /**
    * The request contained a media type or object
    * shape that is either unknown or unsupported in 
    * the type of request.
    * @property {int}
    * @since 1.5
    */
    static unsupportedMediaType = 415
    /**
    * A catch-all code for flagging critical internal
    * errors. Non user-presentable.
    * @property {int}
    * @note
    * - reciept of this code by a client should kick
    * off an automated bug report / capture process
    * - on the server, this code should trigger an 
    * alert in the monitoring service that notifies
    * of a SEV-2 issue.
    * @since 1.5
    */
    static imATeapot = 418
    /**
    * A code indicating that the requestor was already
    * notified of exceeding the rate-limit, and has 
    * done it again. The client needs to enhance 
    * their chill
    * @property {int}
    * @since 1.5
    */
    static chill = 420
    /**
    * The request was recieved, but was unprocessable due
    * to malformed, missing, incomplete, incompatible, 
    * or otherwise invalid request params, body payload,
    * or query parameters.
    * @property {int}
    * @note
    * - This is the catch-all error for malformed requests,
    * but should be compared with `400` if unsure.
    * - In general, if reason for the error is
    * known, use `422`. if the reason is not clear, 
    * or precisely known, use code `badRequest (400)`.
    * @since 1.5
    */
    static unprocessable = 422
    /**
    * While the request was processing, another service, 
    * or process updated or otherwise interacted with the
    * same data. The data returned *may* not be up to date
    * with the current state.
    * @property {int}
    * @note
    * - If recieved by the client, the client should recieve 
    * the data as well, but should immediately attempt a non-
    * modifying request (GET) for the same data, to be sure
    * that the local state is in sync with the remote database.
    * @since 1.5
    */
    static preconditionRequired = 428
    /**
    * The rate limit was exceeding. Client should
    * slow the number of requests per minute.
    * @property {int}
    * @since 1.5
    */
    static rateLimitExceeded = 429
    /**
    * An error indicating an internal
    * failure during request handling
    * @property {int}
    * @note
    * This usually indicates a failure
    * requiring developer intervention
    * or that bug needs resolution.
    * @since 1.5
    */
    static serverError = 500
    /**
    * A static convenience property that
    * pre-formats the class as a struct 
    * with all properties and messages
    * for internal console logging and
    * user-presentable response handling.
    * 
    * @propertydef {struct} - An object containing
    * pre-formatted dictionaries representing
    * all class properties.
    * 
    * @since 1.5
    */
    static message (code) {
        switch (code) {
            case 200:
                return 'success'
            case 204:
                return 'no content found for request'
            case 400:
                return 'bad request'
            case 401:
                return 'authentication failed'
            case 404:
                return 'not found'
            case 405:
                return 'access not allowed to resource'
            case 409:
                return 'there was a conflict while processing this request'
            case 413:
                return 'payload too large'
            case 415:
                return 'unsupported media type'
            case 420:
                return 'rate limit exceeded: enhance your chill'
            case 422:
                return 'unprocessable request'
            case 428:
                return 'precondition requred'
            case 429:
                return 'rate limit exceeded'
            case 500:
                return 'an internal error occured, please try again'
            default:
                return 'i am a teapot, which is not allowed-- this should not be happening'
        }
    }
    /**
    * A static method that accepts an HTTP
    * code and returns the user-presentable 
    * string message for the code.
    * 
    * @param {int} code - one of the HTTP
    * codes supported by `HTTPCodes
    * 
    * @returns {string} - a user-presentable
    * message corresponging with the given code
    * 
    * @default {string} - returns 418, indicating
    * improper implementation or use due to an
    * unsupported HTTP code.
    * 
    * @since 1.5
    * */
    static userMsg (code) {
        switch (code) {
            case 200:
                return 'success'
            case 204:
                return 'no results were found'
            case 400:
                return 'an unknown error was found in the request, please try again'
            case 401:
                return 'unauthorized'
            case 403:
                return ''
            case 404:
                return 'the resource you requested either moved, or doesn\'t exist'
            case 405:
                return 'you do not have the minimum role required for access'
            case 409:
                return 'there was a conflict while processing this request'
            case 413:
                return 'the request payload was too large to process'
            case 415:
                return 'the kind of media used in the request is not supported'
            case 420:
                return 'again, you\'re doing that too much: enhance your chill'
            case 422:
                return 'something incorrect was found in the format of your request, please try again'
            case 428:
                return 'an update needs to be performed to ensure your local data is up-to-date with the server'
            case 429:
                return 'you\'re doing that too much, give it a few seconds and try again'
            case 500:
                return 'the server experienced an error while processing, please submit a bug report'
            // this is 418 && all
            // other unknown codes
            default:
                return 'apologies, something went wrong. please submit a bug report or feedback to the developer'
        }
    }
    /**
    * A static property that conveniently
    * formats the class as a struct 
    * with all properties and messages
    * for internal console logging and
    * user-presentable response handling.
    * 
    * @property {struct} - An object containing
    * pre-formatted dictionaries representing
    * all class properties.
    * 
    * @since 1.5
    */
    static struct = {
            // 2xx
            success:              { 'code': HTTPCodes.success,               'logMsg': HTTPCodes.message(this.success),              'userMsg': HTTPCodes.userMsg(this.success) },
            noContent:            { 'code': HTTPCodes.noContent,             'logMsg': HTTPCodes.message(this.noContent),            'userMsg': HTTPCodes.userMsg(this.noContent) },
            // 4xx
            badRequest:           { 'code': HTTPCodes.badRequest,            'logMsg': HTTPCodes.message(this.badRequest),           'userMsg': HTTPCodes.userMsg(this.badRequest) },
            failedAuth:           { 'code': HTTPCodes.failedAuth,            'logMsg': HTTPCodes.message(this.failedAuth),           'userMsg': HTTPCodes.userMsg(this.failedAuth) },
            failedAuthz:          { 'code': HTTPCodes.failedAuthz,           'logMsg': HTTPCodes.message(this.failedAuthz),          'userMsg': HTTPCodes.userMsg(this.failedAuthz) },
            notFound:             { 'code': HTTPCodes.notFound,              'logMsg': HTTPCodes.message(this.notFound),             'userMsg': HTTPCodes.message(this.notFound) },
            notAllowed:           { 'code': HTTPCodes.notAllowed,            'logMsg': HTTPCodes.message(this.notAllowed),           'userMsg': HTTPCodes.message(this.notAllowed) },
            conflict:             { 'code': HTTPCodes.conflict,              'logMsg': HTTPCodes.message(this.conflict),             'userMsg': HTTPCodes.message(this.conflict) },
            payloadTooLarge:      { 'code': HTTPCodes.payloadTooLarge,       'logMsg': HTTPCodes.message(this.payloadTooLarge),      'userMsg': HTTPCodes.message(this.payloadTooLarge) },
            unsupportedMediaType: { 'code': HTTPCodes.unsupportedMediaType,  'logMsg': HTTPCodes.message(this.unsupportedMediaType), 'userMsg': HTTPCodes.message(this.unsupportedMediaType) },
            imATeapot:            { 'code': HTTPCodes.imATeapot,             'logMsg': HTTPCodes.message(this.imATeapot),            'userMsg': HTTPCodes.message(this.imATeapot) },
            chill:                { 'code': HTTPCodes.chill,                 'logMsg': HTTPCodes.message(this.chill),                'userMsg': HTTPCodes.message(this.chill) },
            unprocessable:        { 'code': HTTPCodes.unprocessable,         'logMsg': HTTPCodes.message(this.unprocessable),        'userMsg': HTTPCodes.message(this.unprocessable) },
            preconditionRequired: { 'code': HTTPCodes.preconditionRequired,  'logMsg': HTTPCodes.message(this.preconditionRequired), 'userMsg': HTTPCodes.message(this.preconditionRequired) },
            rateLimitExceeded:    { 'code': HTTPCodes.rateLimitExceeded,     'logMsg': HTTPCodes.message(this.rateLimitExceeded),    'userMsg': HTTPCodes.message(this.rateLimitExceeded) },
            
            //5xx
            serverError:          { 'code': HTTPCodes.serverError,           'logMsg': HTTPCodes.message(this.serverError),          'userMsg': HTTPCodes.message(this.serverError) }
    }
    /**
    * A convenience property to retrieving a 
    * string representation of the `HTTPCodes` class.
    * 
    * @property {string} - A stringified representation
    * of an `HTTPCodes` instance.
    * 
    * @since 1.5
    */
    static toString = JSON.stringify(HTTPCodes.enum)
}

// return instantiated for direct use
module.exports = HTTPCodes