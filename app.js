require('dotenv').config()
const db = require('./database/conn')
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

// for production
db.sequelize.sync()
  .then(() => {
    seed.seedAdmin()
    console.log('Synced db.')
  })
  .catch((err) => {
    console.log('Failed to sync db: ' + err.message)
  })

//* *only for development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and re-sync db.')
//   seed.seedAdmin()
// }).catch((err) => {
//   console.log('Failed to sync db: ' + err.message)
// })

app.use('/api', routes)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
