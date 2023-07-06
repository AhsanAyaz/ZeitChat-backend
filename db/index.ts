import { getMessage, postNewMessage, clearDb } from "./db";

export const loadMessages = () => getMessage();

export const postMessage = (message: string, userId: string) => postNewMessage(message, userId);

export const deleteAll = () => clearDb();