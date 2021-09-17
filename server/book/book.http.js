import to from "../tools/to.js"
import { addBook, toggleRent, getList } from "./book.controller.js"

const showBooks = async (req, res) => {
  const [err, list] = await to(getList())

  if (err || !list) {
    console.log("500")
    res.status(500).json({ message: "An unexpected error has occurred" })
  }

  res.status(200).send(list)
}

const createBook = async (req, res) => {
  if (!req.body || !req.body.title || !req.body.author || !req.body.thumbnail) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, book] = await to(
    addBook(req.body.title, req.body.author, req.body.thumbnail)
  )

  if (err || !book) {
    res.status(409).json({ message: "That book is already registered" })
    return
  }

  res.status(200).send(book)
}

const rentBook = async (req, res) => {
  if (!req.body || !req.body.bookId) {
    res.status(400).json({ message: "Missing data" })
    return
  }

  const [err, book] = await to(toggleRent(req.body.bookId))

  if (err || !book) {
    res.status(409).json({ message: "That book is not registered" })
    return
  }

  res.status(200).send(book)
}

export { showBooks, createBook, rentBook }
