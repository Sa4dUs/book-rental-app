import axios from "axios"

const makeRequest = () => {
  var data = JSON.stringify({
    title: "Title",
    author: "Author",
    thumbnail: "thumbnail",
  })

  var config = {
    method: "post",
    url: "http://localhost:5000/book/create",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
