'use strict';

const {
  MongoClient
} = require('mongodb');
const uri = "mongodb+srv://team-benoit:02122021ilyesbenoitfinn@cluster0.j2k5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function connectToDatabase() {
  await client.connect();
  console.log("Successfully connected to database!")
}

function closeDatabaseConnection() {
  client.close();
}

async function getChallenges() {
  const challenges = await client.db('Session7').collection('challenges').find({}).toArray();
  console.log('Found documents =>', challenges);
  return challenges;
}

export {
  connectToDatabase,
  closeDatabaseConnection,
  getChallenges
}