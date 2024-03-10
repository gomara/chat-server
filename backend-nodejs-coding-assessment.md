# Backend node.js Chat Server Take-Home coding assessment

## Dear Candidate
Welcome to our take-home coding assessment. We trust you'll find this assessment both challenging and rewarding, and we look forward to the opportunity to discuss your accomplishments further in the next stage.

## Your Challenge
Take on the challenge of developing a chat server system in node.js, enabling users to join chat rooms, send messages, and access chat history. While the messaging protocol is open-ended, you'll have the chance to explain your choice during the interview. Be sure to carefully review all requirements, including bonus objectives, and implement them accordingly. Keep your progress transparent by committing regularly to a public Git repository. Remember, this assessment focuses solely on server-side development, so leave client application development aside for now and let your server skills shine!

## Project features

### Mandatory:
- User authentication with basic username/password login. The credentials can be hardcoded.
- Creation of a single chat room upon server startup. No need to create multiple rooms.
- Persistent storage of chat messages in a Database.
- Sending and receiving messages in the chat room. The client must be able to fetch the room messages
- RESTful endpoints for message sending, and message retrieval.
- Unit testing

### Bonus:
- WebSocket support for real-time chat communication instead of REST API.
- Deletion of messages by clients.
- CI/CD skeleton
- Server scalability

## How to submit your work
- Start by creating a new Git repository on a platform like GitHub, GitLab, or Bitbucket (all the code is your IP)
- Create README.md for the project with the setup instruction
- The server must be able to run and tested based on the README instructions
- Upload the Postman workspace
- Share the public git repository URL

## Testing via Postman
- Use Postman to test the RESTful endpoints (or websocket) for user authentication, message sending, and message retrieval.
- Ensure that messages are persisted in the database and retrieved correctly.
- Code quility checks (based on the unit tests)

## Recommendtions
- Read the features and the bonus features carefully before you start coding
- Committing changes at appropriate intervals in GiT
- Leave TODO in the code if you couldn't finish a solution, you have chance to explain it during the interview
- Try to reduce the 3rd pary library dependencies

## Interview process
- You have 4 days to complete the assessment. We know everyone is busy, so if you need one more day let us know.
- During the interview you need to explain and demonstrate the code via the feature requirements using Postman