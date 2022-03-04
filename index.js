// imports
const e = require('express')
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')

// inits
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('User connected')
    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
    socket.on('I sent msg', (e) => {
        console.log('New messege: ' + e.name + ": " + e.msg)
        socket.broadcast.emit('new msg arrived', e)
    })
    socket.on("i'm typying", (e) => {
        socket.broadcast.emit('someone is typing', e)
    })
})

server.listen(1000, () => console.log('Server is runing'))