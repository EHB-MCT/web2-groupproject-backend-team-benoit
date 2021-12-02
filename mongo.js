'use strict';

import * as mdb from 'mongodb';

const uri = "mongodb+srv://team-benoit:eRROYHQ1vIW0rJNV@cluster0.j2k5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mdb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const collection = client.db('Session7').collection('challenges');

async function connectToDatabase() {
  await client.connect();
  console.log("Successfully connected to database!")
}

function closeDatabaseConnection() {
  client.close();
}

async function getChallenges() {
  const challenges = await collection.find({}).toArray();
  console.log('Challenges =>', challenges);
  return challenges;
}

async function addChallenge(challenge) {
  const result = await collection.insertOne(challenge);
  console.log('Added challenge =>', challenge);
  return result;
}

async function updateChallenge(id, challenge) {
  const result = await collection.updateOne({
    "_id": id
  }, {
    $set: challenge
  });
  console.log('Updated challenge =>', result);
  return result;
}

async function deleteChallenge(id) {
  const result = await collection.deleteOne({
    _id: id
  });
  console.log('Deleted challenge =>', result);
  return result;
}

export {
  connectToDatabase,
  closeDatabaseConnection,
  getChallenges,
  addChallenge,
  updateChallenge,
  deleteChallenge
}