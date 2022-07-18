const { Sequelize, DataTypes } = require('sequelize')
const mysql = require('mysql2')

// Open the connection to MySQL server
const sqlConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

// Run create database statement
sqlConnection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB}`,
  function (err, results) {
    console.log(results)
    console.log(err)
  }
)

// Close the connection
sqlConnection.end()

// Sequelize connection
const connection = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST,
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: process.env.POOL_ACQUIRE,
    idle: process.env.POOL_IDLE
  }
})

connection.authenticate().then(() => {
  console.log(' Connection has been established successfully.')
}).catch((err) => {
  console.log(err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = connection

db.Book = require('../models/book')(connection, DataTypes)
db.User = require('../models/user')(connection, DataTypes)

module.exports = db
