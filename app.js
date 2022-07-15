require('dotenv').config()
require('./database/conn')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const seed = require('./seeders/seed')
const routes = require('./routes/index')
const { errorHandler } = require('./utils/errorHandler')

const corsOptions = { origin: process.env.ALLOW_ORIGIN }
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', routes)

app.use(errorHandler)

seed.seedAdmin()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
