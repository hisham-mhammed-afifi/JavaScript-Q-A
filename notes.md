#### WebSocket :

A WebSocket is a protocol for bi-directional, real-time communication between a client and a server over a single, long-lived connection. It allows for full-duplex communication, which means that both the client and server can send data to each other at the same time, without the need for an explicit request or response.

WebSocket is built on top of the HTTP protocol and uses the same ports (80 and 443) as HTTP and HTTPS, respectively. The protocol starts with an HTTP handshake, which is then upgraded to the WebSocket protocol if both the client and server support it. Once the WebSocket connection is established, data can be sent and received in a binary or text format.

WebSockets are commonly used for real-time applications such as chat systems, multiplayer games, and financial trading platforms. They are also used for real-time updates of data on web pages and for remote control of devices or applications.

WebSocket is supported by most modern web browsers and can also be used with Node.js on the server side, using modules such as `ws` or `socket.io`.

#### HTTP handshake :

In the context of HTTP and WebSocket protocols, a handshake refers to the initial exchange of messages between the client and server to establish a connection.

When a client wants to establish a WebSocket connection with a server, it starts by sending an HTTP request to the server. This request contains a special header called `Upgrade`, which indicates that the client wants to switch from the HTTP protocol to the WebSocket protocol.

If the server supports WebSocket, it responds with an HTTP response that contains the `Upgrade` header as well, along with a `Sec-WebSocket-Accept` header. This header contains a hashed value of a key that the client sent in its initial request. This confirms to the client that the server has accepted the WebSocket connection.

Once the client receives the server's response, it sends another message to the server to confirm the connection. This message contains another key, which the server uses to generate a hashed value and send back to the client.

After this exchange is complete, the connection is fully upgraded to the WebSocket protocol and data can be sent and received in real-time.

#### Example :

Sure, here's an example of how to create a WebSocket server using Node.js with the `ws` module:

```js
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);
    socket.send(`You sent: ${message}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
```

In this example, we create a WebSocket server that listens on port 8080. When a client connects to the server, the `connection` event is triggered and a WebSocket object (`socket`) is created to represent the connection.

We then register event handlers for the `message` and `close` events on the socket object. When a message is received from the client, we log it to the console and send a response back to the client. When the client disconnects, we log a message to the console.

To test this server, you can create a simple WebSocket client in your web browser or using a tool such as `wscat`. For example, you could use the following code in the browser console to connect to the server and send a message:

```js
const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("open", (event) => {
  console.log("Connected to server");
  socket.send("Hello, server!");
});

socket.addEventListener("message", (event) => {
  console.log(`Received message from server: ${event.data}`);
});

socket.addEventListener("close", (event) => {
  console.log("Disconnected from server");
});
```

This code creates a WebSocket object and registers event handlers for the `open`, `message`, and `close` events. When the connection is opened, it sends a message to the server. When a message is received from the server, it logs it to the console. When the connection is closed, it logs a message to the console.

## In JavaScript, there are mainly three date types:

1.  **String**: A string is a textual representation of a date in a particular format. For example, "2023-04-05" or "April 5, 2023".
2.  **Date**: A Date object represents a specific point in time. It stores the number of milliseconds that have elapsed since January 1, 1970, 00:00:00 UTC.
3.  **Timestamp**: A timestamp is the number of seconds or milliseconds that have elapsed since January 1, 1970, 00:00:00 UTC. It's a common format used in databases and APIs.

**Here's how you can convert between these date types using JavaScript:**

**1. String to Date:**

To convert a string to a Date object, you can use the `Date()` constructor and pass the string as a parameter. For example:

```js
const dateString = "2023-04-05";
const dateObj = new Date(dateString);
console.log(dateObj); // Output: Wed Apr 05 2023 00:00:00 GMT+0000 (Coordinated Universal Time)
```

**2. String to Timestamp:**

To convert a string to a timestamp, you can first convert the string to a Date object, and then use the `getTime()` method to get the timestamp value in milliseconds. For example:

```js
const dateString = "2023-04-05";
const dateObj = new Date(dateString);
const timestamp = dateObj.getTime();
console.log(timestamp); // Output: 1670169600000
```

**3. Date to String:**

To convert a Date object to a string, you can use the `toLocaleDateString()` method or the `toISOString()` method. For example:

```js
const dateObj = new Date();
const dateString = dateObj.toLocaleDateString();
console.log(dateString); // Output: "4/5/2023"

const isoString = dateObj.toISOString();
console.log(isoString); // Output: "2023-04-05T00:00:00.000Z"
```

**4. Date to Timestamp:**

To convert a Date object to a timestamp, you can use the `getTime()` method. For example:

```js
const dateObj = new Date();
const timestamp = dateObj.getTime();
console.log(timestamp); // Output: 1670169600000
```
