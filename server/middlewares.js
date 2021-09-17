import express from "express"
import { init, protectWithJwt } from "./tools/auth-middleware.js"

const setUpMiddlewares = (app) => {
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  init()
  app.use(protectWithJwt)
}

export { setUpMiddlewares }
