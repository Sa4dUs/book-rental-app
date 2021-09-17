import express from "express"
import dotenv from "dotenv"
dotenv.config()

import database from "./database.js"
database()

const app = express()
const port = process.env.PORT || 3000

import cors from "cors"
app.use(cors());

import { setUpMiddlewares } from "./middlewares.js"
setUpMiddlewares(app)

// Router
import authRouter from "./auth/auth.router.js"
import bookRouter from "./book/book.router.js"

app.use("/auth", authRouter)
app.use("/book", bookRouter)

app.get("/", (req, res) => {
  res.send("Connection stablished")
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

export default app
