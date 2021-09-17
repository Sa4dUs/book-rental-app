import { genSaltSync, hashSync, compareSync } from "bcrypt"

const hashPassword = (harcodedPassword) => {
  const salt = genSaltSync(10)
  return hashSync(harcodedPassword, salt)
}

const comparePassword = (harcodedPassword, hash) => {
  return compareSync(harcodedPassword, hash)
}

export { hashPassword, comparePassword }
