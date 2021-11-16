const express = require('express')
const router = express.Router()
const PulseAudio = require('../../endpoints/v0.1/pulseAudio')
const pulseAudio = new PulseAudio()
const Shairport = require('../../endpoints/v0.1/shairport')
const shairport = new Shairport()

router.get(
    '/pulse',
    (req, res) => pulseAudio.test(req, res)
    )

router.get(
    '/shairport',
    (req, res) => shairport.test(req, res)
    )

module.exports = router