import express from "express"
import { registerUser, loginUser, updateUser } from "./auth.http.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.put("/update", updateUser)
router.delete("/delete", updateUser)

export default router
