import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import {YSocketIO} from "y-socket.io/dist/server" 

const app = express()

// create HTTP server
const httpServer = createServer(app)

// create Socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

// initialize YSocketIO AFTER io is created
const ySocketIO = new YSocketIO(io)
ySocketIO.initialize()  // fixed spelling

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    message: "hello world",
    success: true
  })
})

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Ok",
    success: true
  })
})

// Start server
httpServer.listen(3000, () => {
  console.log("Server is running on port 3000")
})