import mongoose from "mongoose"

export default () => {
  let dbUri = process.env.DB_URI
  let message = "Connecting to MongoDB..."

  if (process.env.NODE_ENV === "test") {
    dbUri = process.env.DB_URI_TEST
    message = "Connecting to MongoDB test..."
  }

  console.log(message)
  mongoose.connect(dbUri, { useNewUrlParser: true })
}
