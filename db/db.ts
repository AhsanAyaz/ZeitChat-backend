import { MongoClient } from 'mongodb';
require('dotenv').config();

const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE = process.env.MONGO_INITDB_DATABASE;
const COLLECTION = 'Messages';

const url = `mongodb+srv://Mob-TBD:${PASSWORD}@tbd.9kb2pyc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);

export const getMessage = async () => {
  await client.connect();
  const db = client.db(DATABASE);
  const collection = db.collection(COLLECTION);

  const message = await collection.find({}).toArray();

  return message;
};

export const postNewMessage = async (message: string, user: string) => {
  await client.connect();
  console.log("Connected correctly to server");
  const db = client.db(DATABASE);
  const collection = db.collection(COLLECTION);

  const newMessage = {
    text: message,
    userId: user,
  };

  const res = await collection.insertOne(newMessage);

  return newMessage;
};

export const clearDb = async () => {
  await client.connect();
  const db = client.db(DATABASE);
  const collection = db.collection(COLLECTION);
  const res = await collection.deleteMany();
  return res;
}

