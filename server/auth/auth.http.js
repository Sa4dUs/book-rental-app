import jwt from "jsonwebtoken"
import to from "../tools/to.js"
import {
  createUser,
  checkUserCredentials,
  updateData,
  removeUser
} from "./auth.controller.js"

const registerUser = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, user] = await to(createUser(req.body.email, req.body.password))

  if (err || !user) {
    res.status(409).json({
      message: "There's already an account registered with that email",
    })
    return
  }

  res.status(200).send(user)
}

const loginUser = async (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, user] = await to(
    checkUserCredentials(req.body.email, req.body.password)
  )

  if (err || !user) {
    res.status(401).json({
      message: "Invalid credentials",
    })
    return
  }

  const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY)

  res.status(200).json({ userId: user.userId, token: token })
}

const updateUser = async (req, res) => {
  if (!req.body || !req.body.userId || !req.body.data) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, user] = await to(updateData(req.body.userId, req.body.data))

  if (err || !user) {
    res.status(400).json({ message: "No user found" })
    return
  }

  res.status(200).send(user)
}

const deleteUser = async (req, res) => {
  if (!req.body || !req.body.userId) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, user] = await to(removeUser(req.body.userId))
  res.status(200).json({message: "User succesfully deleted"})
}

export { registerUser, loginUser, updateUser, deleteUser }
