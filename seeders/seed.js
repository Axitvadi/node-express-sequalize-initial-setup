const bcrypt = require('bcryptjs')
const User = require('../models/user')

exports.seedAdmin = async () => {
  const admin = await User.findOne({ email: process.env.ADMIN_EMAIL })
  if (!admin) {
    const hashedPw = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10)
    await User.create({
      first_name: 'LMS',
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
