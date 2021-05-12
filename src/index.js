require('dotenv').config()
require('./models/User')
const express = require('express')
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const routeRoutes = require('./routes/routeRoutes')

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () =>
  console.log('Connected to mongodb instance')
)

mongoose.connection.on('err', () =>
  console.log('Error connecting to mongodb instance', err)
)

const app = express()
app.use(express.json())
app.use(authRoutes)
app.use(routeRoutes)

app.get('/', (req, res) => {
  res.send('Routes Taken API')
})

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(
    `Server listening on port ${port} in ${process.env.NODE_ENV} mode`
  )
)
