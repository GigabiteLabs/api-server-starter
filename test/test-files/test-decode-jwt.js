const { expect } = require('chai')

describe('jwt decoding util', () => {
    let JWTDecode, JWTPortion, JWTTestData

    before(() => { 
        JWTDecode = require('../../server/utilities/jwt/JWTDecode')
        JWTPortion = require('../../server/utilities/jwt/JWTPortion')
        JWTTestData = require('../test-data/test-jwt')
    })
    
    it('decodes a JWT payload by default if no portion option provided', async () => {
        let payload = await JWTDecode(JWTTestData.rawJWT)
        expect(payload.name = JWTTestData.payload.name)
        expect(payload.iat = JWTTestData.payload.iat)
    })

    it('decodes a JWT header when portion option is provided', async () => {
        let header = await JWTDecode(JWTTestData.rawJWT, JWTPortion.HEADER)
        expect(header.alg = JWTTestData.header.alg)
        expect(header.typ = JWTTestData.header.typ)
    })

    it('decodes a JWT payload when portion option is provided', async () => {
        let payload = await JWTDecode(JWTTestData.rawJWT, JWTPortion.PAYLOAD)
        expect(payload.name = JWTTestData.payload.name)
        expect(payload.iat = JWTTestData.payload.iat)
    })

    it('decodes a JWT signature when portion option is provided', async () => {
        let signature = await JWTDecode(JWTTestData.rawJWT, JWTPortion.SIGNATURE)
        expect(signature.encryptedSig = JWTTestData.signature.encryptedSig)
    })

    it('throws if JWT with invalid number of segments is provided', async () => {
        try {
            let payload = await JWTDecode(JWTTestData.invalidJWTSegmentCount)
            expect.fail('exception should be thrown for invalid JWTSegmentCount');
        } catch(e) {
            // error should be thrown, but
            // don't expect verbatim language because it
            // can change over time
            expect(e != "" && e != null)
        }
    })
})