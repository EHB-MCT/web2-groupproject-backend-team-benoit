'use strict';

import * as mdb from 'mongodb';

const uri = "mongodb+srv://team-benoit:eRROYHQ1vIW0rJNV@cluster0.j2k5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mdb.MongoClient(uri, {
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