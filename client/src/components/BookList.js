import { React, useState, useEffect } from "react"
import axios from "axios"

import Loading from "./Loading.js"
import Book from "./Book.js"

const BookList = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [bookList, setBookList] = useState()

  useEffect(() => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/book`,
      headers: {},
    }

    axios(config)
      .then(function (response) {
        setBookList(response.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return isLoading && !bookList ? (
    <Loading />
  ) : (
    <>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search book by name..."
          aria-label="Search book by name..."
          aria-describedby="button-addon2"
        />
        <button className="btn btn-primary" type="button" id="button-addon2">
          Button
        </button>
        <section className="booklist">
          {bookList.map((book) => {
            return (
              <Book
                key={book._id}
                id={book.bookId}
                thumbnail={book.thumbnail}
                title={book.title}
                author={book.author}
              />
            )
          })}
        </section>
      </div>
    </>
  )
}

export default BookList
