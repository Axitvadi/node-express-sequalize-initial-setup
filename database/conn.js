const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Database Connected...')
  })
  .catch((err) => {
    console.log(err)
  })
