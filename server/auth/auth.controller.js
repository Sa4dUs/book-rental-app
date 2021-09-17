import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"
import { hashPassword, comparePassword } from "../tools/crypto.js"

const UserModel = new mongoose.model("User", {
  userId: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const createUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let query = await UserModel.findOne({ email: email }).exec()

    if (query) {
      reject()
    } else {
      let newUser = new UserModel({
        userId: uuidv4(),
        email: email,
        password: hashPassword(password),
      })

      await newUser.save()
      resolve(newUser)
    }
  })
}

const checkUserCredentials = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let query = await UserModel.findOne({ email: email }).exec()
    if (!query) {
      reject()
    } else {
      if (comparePassword(password, query.password)) {
        resolve({ userId: query.userId })
      }
      reject()
    }
  })
}

const updateData = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    let query = await UserModel.findOne({ userId: userId }).exec()
    if (!query) {
      reject()
    } else {
      if (data.email) {
        query.email = data.email
        UserModel.updateOne({ userId: userId }, { email: data.email }).exec()
      }

      if (data.password) {
        query.password = data.password
        UserModel.updateOne(
          { userId: userId },
          { password: hashPassword(data.password) }
        )
      }
      resolve(query)
    }
  })
}

const removeUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let query = await UserModel.findOne({ userId: userId }).exec()
    if (!query) {
      reject()
    } else {
      await UserModel.deleteOne({ userId: userId }).exec()
      resolve()
    }
  })
}

const cleanUpUsers = () => {
  return new Promise(async (resolve, reject) => {
    await UserModel.deleteMany({}).exec()
    resolve()
  })
}

export {
  createUser,
  checkUserCredentials,
  updateData,
  removeUser,
  cleanUpUsers,
}
