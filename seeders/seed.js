const bcrypt = require('bcryptjs')
const db = require('../database/conn')
const { User } = db

exports.seedAdmin = async () => {
  const admin = await User.findOne({ where: { email: process.env.ADMIN_EMAIL } })
  if (!admin) {
    const hashedPw = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    await User.create({
      first_name: 'sequelize',
      last_name: 'Admin',
      email: process.env.ADMIN_EMAIL,
      role: 'admin',
      password: hashedPw
    })
    console.log('Admin Seeded')
  } else {
    console.log('Admin exist')
  }
}
