const bcrypt = require("bcrypt")
require("dotenv").config()

const encryptPassword = async (password) => {
  return await bcrypt.hash(password, Number.parseInt(process.env.SALT_ROUNDS) || 10)
}

const decryptPassword = async (password, encryptedPassword) => {
  return await bcrypt.compare(password, encryptedPassword)
}

module.exports = {
  encryptPassword,
  decryptPassword
}