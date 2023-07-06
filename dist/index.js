"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
io.on("connection", (socket) => {
    console.log("New client connected");
    io.emit("clientCount", io.eio.clientsCount);
    socket.on("newMessage", (newMessage) => {
        console.log("Message received: ", newMessage);
        io.emit('Message sent');
        console.log("Message sent");
    });
    socket.on('delete all', () => {
        (0, db_1.deleteAll)();
        io.emit('Message sent');
    });
    socket.on("disconnect", () => {
        console.log("Client has disconnected");
    });
});
app.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.debug('getting messages');
    const messages = yield (0, db_1.loadMessages)();
    logger_1.default.debug('messages');
    logger_1.default.debug(messages);
    res.json(messages);
}));
app.get('/hello', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.debug('hello world');
    res.json({
        hello: 'world'
    });
}));
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield (0, db_1.postMessage)(req.body.text, req.body.userId);
    return message;
}));
app.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
server.listen(Number(port) + 1);
app.listen(port, () => {
    console.log("listening to port: ", port);
});
