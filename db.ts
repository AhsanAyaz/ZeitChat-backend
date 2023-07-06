import { MongoClient, ServerApiVersion } from 'mongodb';
require('dotenv').config();

const USERNAME = process.env.MONGO_INITDB_ROOT_USERNAME;
const PASSWORD = process.env.MONGO_INITDB_ROOT_PASSWORD;
const DATABASE = process.env.MONGO_INITDB_DATABASE;
const COLLECTION = '';

// const url = `mongodb://${USERNAME}:${PASSWORD}@localhost:27017`;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@tbd.9kb2pyc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);
