const express = require('express')
const router = express.Router()
const PublicEndpoints = require('../../v0.1/endpoints/public')
const public = new PublicEndpoints()

router.get(
    '/something',
    (req, res) => public.getSomething(req, res)
  )

module.exports = router