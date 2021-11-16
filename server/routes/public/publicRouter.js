const express = require('express')
const router = express.Router()
const PublicEndpoints = require('../../endpoints/testing/publicEndpoints')
const public = new PublicEndpoints()

router.get(
    '/something',
    (req, res) => public.getSomething(req, res)
  )

module.exports = router