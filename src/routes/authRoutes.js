const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      const user = new User({ email, password })
      await user.save()

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      })

      res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ error: 'Someting went wrong' })
    }
  }
)

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Must provide email and password' })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const match = await user.comparePassword(password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    })

    res.status(200).json({ token })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

module.exports = router
