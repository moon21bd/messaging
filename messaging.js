var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/chatting', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

// pass an socket params in js arrow func so that when an user being disconnected the we'll notified
io.on('connection', (socket) => {

    console.log('a user is connected')
    socket.broadcast.emit('Welcome to my chat window !!')
    socket.on('chat message', function (msg) {
        // console.log('message: ' + msg)
        io.emit('chat message', msg)
    })
    socket.on('disconnect', function () {
        console.log('user disconnected')
    })
})

// so our first chat message window is done. next we will implement the other

var server = http.listen(3001, () => {
    console.log('server is running on port', server.address().port);
});