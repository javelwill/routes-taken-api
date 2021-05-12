const express = require('express')

const router = express.Router()

router.get('/routes', (req, res) => {
  res.send('Get routes')
})

router.post('/routes', (req, res) => {
  res.send('Create route')
})

module.exports = router
