const express = require('express')
const { stripePayment } = require('../controllers/stripePayment')
const router = express.Router()


router.post('/payment',stripePayment)

module.exports = router