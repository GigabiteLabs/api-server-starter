const express = require('express')
const router = express.Router()

router.get(
    '/test',
    (req, res) => res.send('test v0.2 was ok')
    )

module.exports = router