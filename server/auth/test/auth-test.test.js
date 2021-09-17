import chai from "chai"
import chaiHttp from "chai-http"

chai.use(chaiHttp)

import app from "../../index.js"
import { cleanUpUsers } from "../auth.controller.js"

after(() => {
  cleanUpUsers()
})

describe("Auth test suite", () => {
  // Endpoint => "/auth/register"
  it("should return 400 if no credentials are provided", (done) => {
    chai
      .request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 400)
        done()
      })
  })
  it("should return 200 if credentials are provided", (done) => {
    chai
      .request(app)
      .post("/auth/register")
      .set("content-type", "application/json")
      .send({ email: "user@test.com", password: "1234" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200)
        done()
      })
  })
  // Endpoint => "/auth/login"
  it("should return 400 if no credentials are provided", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 400)
        done()
      })
  })
  it("should return 401 if invalid credentials", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: "user@test.com", password: "4321" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401)
        done()
      })
  })
  it("should return 200 if correct credentials", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: "user@test.com", password: "1234" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200)
        done()
      })
  })
  // Endpoint => "/auth/update"
  it("should return 401 if no JWT token provided", (done) => {
    chai
      .request(app)
      .put("/auth/update")
      .set("content-type", "application/json")
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 401)
        done()
      })
  })
  it("should return 400 if no data is provided", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: "user@test.com", password: "1234" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200)
        chai
          .request(app)
          .put("/auth/update")
          .set("content-type", "application/json")
          .set("Authorization", `JWT ${res.body.token}`)
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 400)
            done()
          })
      })
  })
  it("should return 200 if data is provided", (done) => {
    chai
      .request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({ email: "user@test.com", password: "1234" })
      .end((err, res) => {
        chai.assert.equal(res.statusCode, 200)
        chai
          .request(app)
          .put("/auth/update")
          .set("content-type", "application/json")
          .set("Authorization", `JWT ${res.body.token}`)
          .send({userId: res.body.userId, data: {email: "other@test.com", password: "4321"}})
          .end((err, res) => {
            chai.assert.equal(res.statusCode, 200)
            done()
          })
      })
  })
})
