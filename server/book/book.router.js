import express from "express"
import { createBook, rentBook, showBooks } from "./book.http.js"

const router = express.Router()

router.get("/", showBooks)
router.post("/create", createBook)
router.put("/rent", rentBook)

export default router