import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const BookModel = new mongoose.model("Book", {
  bookId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: { type: String, required: true },
  rented: { type: Boolean, required: true },
})

const addBook = (title, author, thumbnail) => {
  return new Promise(async (resolve, reject) => {
    let query = await BookModel.findOne({ title: title }).exec()

    if (query) {
      reject()
    } else {
      let newBook = new BookModel({
        bookId: uuidv4(),
        title: title,
        author: author,
        thumbnail: thumbnail,
        rented: false,
      })

      await newBook.save()
      resolve(newBook)
    }
  })
}

const toggleRent = (bookId) => {
  return new Promise(async (resolve, reject) => {
    let query = await BookModel.findOne({ bookId: bookId }).exec()
    if (!query) {
      reject()
    } else {
      BookModel.updateOne({ bookId: bookId }, { rented: !query.rented }).exec()
      resolve(query)
    }
  })
}

const getList = () => {
  return new Promise(async (resolve, reject) => {
    let query = await BookModel.find({}).exec()
    if (!query) {
      reject()
    } else {
      resolve(query)
    }
  })
}

export { addBook, toggleRent, getList }
