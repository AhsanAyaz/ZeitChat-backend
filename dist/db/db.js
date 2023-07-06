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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDb = exports.postNewMessage = exports.getMessage = void 0;
const mongodb_1 = require("mongodb");
require('dotenv').config();
const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE = process.env.MONGO_INITDB_DATABASE;
const COLLECTION = 'Messages';
const url = `mongodb+srv://Mob-TBD:${PASSWORD}@tbd.9kb2pyc.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongodb_1.MongoClient(url);
const getMessage = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const db = client.db(DATABASE);
    const collection = db.collection(COLLECTION);
    const message = yield collection.find({}).toArray();
    return message;
});
exports.getMessage = getMessage;
const postNewMessage = (message, user) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    console.log("Connected correctly to server");
    const db = client.db(DATABASE);
    const collection = db.collection(COLLECTION);
    const newMessage = {
        text: message,
        userId: user,
    };
    const res = yield collection.insertOne(newMessage);
    return newMessage;
});
exports.postNewMessage = postNewMessage;
const clearDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const db = client.db(DATABASE);
    const collection = db.collection(COLLECTION);
    const res = yield collection.deleteMany();
    return res;
});
exports.clearDb = clearDb;
