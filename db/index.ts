import { getMessage, postNewMessage, clearDb } from "./db";

export const loadMessages = () => getMessage();

export const postMessage = async (message: string, userId: string) => await postNewMessage(message, userId);

export const deleteAll = () => clearDb();