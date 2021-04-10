const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const socketio = require('socket.io');
const sockets = require('./sockets/sockets');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/static/images', express.static(__dirname + '/images'));
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err) => (err ? console.error(err) : console.log('Connected'))
);

server.listen(process.env.PORT || 3001);

const io = socketio(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

sockets(io);
