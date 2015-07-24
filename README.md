# vchato
A web-socket based video chatting service. But it lacks audio service.

I trying out websockets and thought of working on some projects. So, I built this. This is not a complete project, was just developed roughly in a day while trying out web-sockets with node.

### Tech used:
  - node.js
  - express.js
  - binary.js
  - websockets
  - webcam via getUserMedia

### Theory
  It takes a jpeg image from the webcam and sends to the server. If another client is connected then server relays that to other client where it is loaded in an img tag. And so does the other client.
