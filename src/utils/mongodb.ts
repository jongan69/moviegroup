import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'your-mongodb-uri';
const options = {};

let client;
let clientPromise: Promise<MongoClient> | null = null;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise!; 