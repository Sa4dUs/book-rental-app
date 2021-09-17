import { React, useState } from "react"
import axios from "axios"

const Book = (props) => {
  const [isRented, setIsRented] = useState(props.rented)
  return (
    <article className="book">
      <img src={props.thumbnail} alt="" />
      <h1>{props.title}</h1>
      <h4>{props.author}</h4>
      <button
        type="button"
        className={"rent-btn"}
        style={{ backgroundColor: isRented ? "#73a839" : "#95151a" }}
        onClick={() => {
          const data = JSON.stringify({
            bookId: props.id,
          })

          const config = {
            method: "put",
            url: `${process.env.REACT_APP_API_URL}/book/rent`,
            headers: {
              "Content-Type": "application/json",
              Authorization: "JWT",
            },
            data: data,
          }

          axios(config)
            .then(function (response) {
              setIsRented(!isRented)
            })
            .catch(function (error) {
              console.log(error)
            })
        }}
      >
        {isRented ? "Rented" : "Not Rented"}
      </button>
    </article>
  )
}

export default Book
