"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAll = exports.postMessage = exports.loadMessages = void 0;
const db_1 = require("./db");
const loadMessages = () => (0, db_1.getMessage)();
exports.loadMessages = loadMessages;
const postMessage = (message, userId) => (0, db_1.postNewMessage)(message, userId);
exports.postMessage = postMessage;
const deleteAll = () => (0, db_1.clearDb)();
exports.deleteAll = deleteAll;