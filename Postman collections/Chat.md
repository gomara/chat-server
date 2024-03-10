# Chat collection

This is a simple chat server that supports RESTful and websocket.
Make sure to replace the `:chatRoomId`, `:messageId` in the url of the requests with the `chatRoomId` and `messageId` that you want to use and also replace the `authorization token` in the header of the requests with the token that you get from the login request.

There are two folders in this collection:

## Auth

Url: `http://localhost:3500/auth`

This folder contains the requests to authenticate a user and to create a new user.

- The first and the second request are to register a new user.
  - type: `POST`
    <br> **url**: `http://localhost:3500/auth/register`
- The third request is to fail the registration of a new user because the user already exists.
  - type: `POST`
    <br> **url**: `http://localhost:3500/auth/register`
- The fourth request is to authenticate a user and fail because the credentials are wrong.
  - type: `POST`
    <br> **url**: `http://localhost:3500/auth/login`
- The fifth request is to authenticate a user and succeed, this request will return a token that you can use to authenticate the user in the chat requests. So, you need to copy the token and paste it in the `authorization token` with `bearer token type ` header of the chat requests.
  - type: `POST`
    <br> **url**: `http://localhost:3500/auth/login`

## ChatRooms

Url: `http://localhost:3500/rooms`

This folder contains the requests to manage the chat rooms and the messages of the chat rooms.<br>
Here you can find the requests to get the available chat rooms, to get the messages of a chat room, to join a chat room, to send a message to a chat room and to delete a message from a chat room.<br>
Every request in this folder needs the `authorization token` with `bearer token type ` header to authenticate the user.

- The first request is to get the available chat rooms. You can copy the `chatRoomId` of the chat room that you want to join and paste it in the `chatRoomId url` of the other requests.

  - type: `GET`
    <br> **url**: `http://localhost:3500/rooms`

- The second request is to send a message to a chat room and fail because the user is not in the chat room.
  - type: `POST`
    <br> **url**: `http://localhost:3500/rooms/:chatRoomId/message`
- The third request is to join a chat room.
  - type: `POST`
    <br> **url**: `http://localhost:3500/rooms/:chatRoomId`
- The fourth request is to send a message to a chat room.
  - type: `POST`
    <br> **url**: `http://localhost:3500/rooms/:chatRoomId/message`
- The fifth request is to delete a message from a chat room. You can copy the `messageId` of the message that you want to delete and paste it in the `messageId url` of the request.
  - type: `DELETE`
    <br> **url**: `http://localhost:3500/rooms/:chatRoomId/message/:messageId`
- The sixth request is to get the messages of a chat room.
  - type: `GET`
    <br> **url**: `http://localhost:3500/rooms/:chatRoomId`
