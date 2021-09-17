# Book Rentals APP

- Download this source into a working directory:

```
git clone https://github.io/sa4dus/book-rentals-api
```

## Client

### Setup

- Install the requirements using npm:

```
cd book-rentals-api/client
npm install
```

#### Enviroment setup

- Create a `.env` file including the following variables:

```
REACT_APP_API_URL = <api_url>
```

### Deployment

- Deploy the server locally:

```
npm start
```

## API

- Install the requirements using npm:

```
cd book-rentals-api/server
npm install
```

### Setup


#### Enviroment setup

- Create a `.env` file including the following variables:

```
PORT = <api_port> // by default, server will run on port 3000

SECRET_KEY = <jwt_secret_token>
DB_URI = <mongodb_database_uri>
DB_NAME = <mongodb_database_name>
DB_NAME_TEST = <mongodb_test_database_name>
DB_USER = <mongodb_database_superuser>
DB_PASS = <mongodb_database_password>
NODE_ENV = <nodejs_enviroment>
```

#### Database setup

- You will have to create a mongodb cluster with two databases: <DB_NAME> and <DB_NAME_TEST>.
- Each of them, will have two collections: "users" and "books".

### Deployment

- Deploy the server locally:

```
npm start
```

### Features

| Endpoint       | Method | Feature                                |
| :------------- | :----: | :------------------------------------- |
| /              |  GET   | Check if API is up                     |
| /auth/register |  POST  | Create a new user                      |
| /auth/login    |  POST  | Log in as a user                       |
| /auth/update   |  PUT   | Change username or password of an user |
| /book/rent     |  GET   | Get booklist                           |
| /book/rent     |  POST  | Rent a book                            |

#### POST /auth/register

##### HEADERS

```json
{
  Content-Type: "application/json"
}
```

##### BODY

```json
{
  "email": String,
  "password": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
  "message": "Missing data"
}
```

409 Conflict

```json
{
  "message": "There's already an account registered with that email"
}
```

200 OK

```json
{
  "userId": <uuid identifier>
}
```

#### POST /auth/login

##### HEADERS

```json
{
  Content-Type: "application/json"
}
```

##### BODY

```json
{
  "email": String,
  "password": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
  "message": "Missing data"
}
```

401 Unauthorized

```json
{
  "message": "Invalid credentials"
}
```

200 OK

```json
{
  "userId": <uuid identifier>,
  "token": <JWT Authentication token>
}
```

#### POST /auth/update

##### HEADERS

```json
{
  Content-Type: "application/json",
  Authorization: "JWT <token>"
}
```

##### BODY

```json
{
  "userId": String,
  "data": {
    "email": String?,
    "password": String?
  }
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
  "message": "Missing or wrong data"
}
```

401 Unauthorized

```json
{
  "message": "Invalid authentication"
}
```

200 OK

```json
{
  "userId": <uuid identifier>,
  "token": <JWT Authentication token>
}
```

#### GET /book/

##### RESPONSE FORMATS

200 OK

```json
{
  "message": "Missing or wrong data"
}
```

#### POST /book/create

##### HEADERS

```json
{
  // For each book
  {
    "bookId": String,
    "title": String,
    "author": String,
    "thumbnail": String,
    "rented": Bool,
    "_id": String,
    "__v": Integer
}
}
```

##### BODY

```json
{
  "title": String,
  "author": String,
  "thumbnail": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
  "message": "Missing or wrong data"
}
```

200 OK

```json
{
    "bookId": String,
    "title": String,
    "author": String,
    "thumbnail": String,
    "rented": Bool,
    "_id": String,
    "__v": Integer
}
```

#### PUT /book/rent

##### HEADERS

```json
{
  Content-Type: "application/json",
  Authorization: "JWT <token>"
}
```

##### BODY

```json
{
  "bookId": String
}
```

##### RESPONSE FORMATS

400 Bad Request

```json
{
  "message": "Missing data"
}
```

409 Bad Request

```json
{
  "message": "That book is not registered"
}
```

200 OK

```json
{
    "bookId": String,
    "title": String,
    "author": String,
    "thumbnail": String,
    "rented": Bool,
    "_id": String,
    "__v": Integer
}
```
