# Chat-server

## Setup

### Install dependencies

For the server to run, you need to install the dependencies. I node **v20.11.1** with **pnpm** with for this proyect, if you don't have it installed, you can install it with the following command:

```bash
npm install -g pnpm
```

Then, you can install the dependencies with the following command:

```bash
pnpm install
```

For the database. I created a docker-compose file to run a MongoDb database. This will run in the port **27017**. You can run it with the following command:

```bash
pnpm start-local-database
```

The first time your run the database, a seed will be created with a user and a chat room.
The chat room id will be displayed in the console.
For the user you can set the username and password in the **.env** file (see below).

### Environment variables

The server uses environment variables to run. You can create a **.env** file in the root of the project with the following variables:

```env
PORT=3500
MONGO_URL=mongodb://localhost:27017
NODE_ENV=development
SECRET_KEY="add a secret key here"
TEST_PORT=4000
USERNAME="add a username here"
PASSWORD="add a password here"
```

### Run the server

To run the server, you can use the following command:

```bash
pnpm dev
```

This will start the server in the port **3500**.

### Run the tests

To run the tests, you can use the following command:

```bash
pnpm test
```

This will run the tests and show the coverage.

## Available endpoints

The available endpoints are the following:

### Authentication

- **POST** /auth/login - To login with a username and password.

  - variables:
    - username: string
    - password: string
  - returns:
    - authorization: string
    - success: boolean

- **POST** /auth/register - To register a new user
  - variables:
    - username: string
    - password: string
  - returns:
    - success: boolean
    - user: object

### Chat

- **GET** /rooms - To get available chat rooms

  - headers:
    - authorization token: string
  - returns:
    - success: boolean
    - rooms: array

- **GET** /rooms/:chatRoomId - To get the messages of a chat room

  - headers:
    - authorization token: string
  - returns:
    - success: boolean
    - messages: array

- **POST** /rooms/:chatRoomId - To join a chat room

  - headers:
    - authorization token: string
  - returns:
    - success: boolean
    - message: string

- **POST** /rooms/:chatRoomId/messages - To send a message to a chat room

  - headers:
    - authorization token: string
  - variables:
    - message: string
  - returns:
    - success: boolean
    - createdMessage: object

- **DELETE** /rooms/:chatRoomId/messages/:messageId - To delete a message from a chat room

  - headers:
    - authorization token: string
  - returns:
    - success: boolean
    - message: string

## Websocket

The server also supports websocket. You can connect to the server using the following URL:

```bash
localhost:3500
```

### Socket events

- **joinRoom** - To join a chat room
  ```json
  {
      "roomId": string,
      "username": string,
  }
  ```
- **message** - To send a message to a chat room
  ```json
  {
      "roomId": string,
      "username": string,
      "message": string
  }
  ```

### Postman workspace

It's possible to test the server using Postman. Your can test the RESTful endpoints and the websocket.

You can import the Postman collection for test the server endpoint, the collection is in the file **Chat server.postman_collection.json**. inside the folder **Postman collections**

NOTE: Postman didn't allow me to export the sockets collection, but you can test the sockets with the events described above in the **Socket events** section.

## TODO

The following is a list of things that I would like to improve in the future:

[] Add more integration and unit test
[] improve types in the code
[] improve the documentaion
