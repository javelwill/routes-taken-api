require('dotenv').config()
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Routes Taken API')
})

const port = process.env.PORT || 5000

app.listen(port, () =>
  console.log(
    `Server listening on port ${port} in ${process.env.NODE_ENV} mode`
  )
)
