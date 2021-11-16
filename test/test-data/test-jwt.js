const JWTTestData  = {
    rawJWT: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.WWRl4ob4OYid8xYSU_HCRmPGXkdTiFKMqYs_g_Ppq-0",
    invalidJWTSegmentCount: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
    header: {
        alg: "HS256",
        typ: "JWT"
    },
    payload: {
        iat: 1516239022,
        name: "John Doe",
    },
    signature: {
        rawSig: "ur84jr0sidru83jd93jr",
        encryptedSig: "WWRl4ob4OYid8xYSU_HCRmPGXkdTiFKMqYs_g_Ppq-0"
    }
}

module.exports = JWTTestData