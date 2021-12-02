'use strict';

import * as mdb from 'mongodb';

const uri = process.env.MONGO_URI;
const client = new mdb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const challengesCollection = client.db('Session7').collection('challenges');
const usersCollection = client.db('Session7').collection('challenges');

async function connectToDatabase() {
  await client.connect();
  console.log("Successfully connected to database!")
}

function closeDatabaseConnection() {
  client.close();
}

async function getChallenges() {
  const challenges = await challengesCollection.find({}).toArray();
  console.log('Challenges =>', challenges);
  return challenges;
}

async function addChallenge(challenge) {
  const result = await challengesCollection.insertOne(challenge);
  console.log('Added challenge =>', challenge);
  return result;
}

async function updateChallenge(id, challenge) {
  const result = await challengesCollection.updateOne({
    _id: mdb.ObjectId(id)
  }, {
    $set: challenge
  });
  console.log('Updated challenge =>', result);
  return result;
}

async function deleteChallenge(id) {
  const result = await challengesCollection.deleteOne({
    _id: mdb.ObjectId(id)
  });
  console.log('Deleted challenge =>', result);
  return result;
}

async function setChallenge(userId, challengeId, state) {
  const updatedChallenges = await getUserChallenges(userId);
  if (!state) {
    updatedChallenges.splice(updatedChallenges.indexOf(challengeId), 1);
  } else {
    updatedChallenges.push(challengeId);
  }
  const result = await usersCollection.updateOne({
    _id: mdb.ObjectId(userId)
  }, {
    $set: {
      challenges: updatedChallenges
    }
  });
  console.log('Updated user challenges =>', result);
  return result;
}

async function getUserChallenges(userId) {
  const user = await usersCollection.find({
    _id: userId
  }).toArray();
  return user.challenges;
}

export {
  connectToDatabase,
  closeDatabaseConnection,
  getChallenges,
  addChallenge,
  updateChallenge,
  deleteChallenge
}