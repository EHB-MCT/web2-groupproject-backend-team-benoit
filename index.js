import * as mongo from './mongo.js';
import dotenv from 'dotenv';

import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

import * as bodyParser from 'body-parser';
import * as nodemon from 'nodemon';
import cors from 'cors';

import {
    cp
} from 'fs';

app.use(cors());
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.status(300).redirect('/info.html');
})

app.get('/challenges', async (req, res, next) => {
    try {
        await mongo.connectToDatabase();
        let challenges = await mongo.getChallenges();
        res.status(200).send(challenges);
    } catch (error) {
        console.log(error);
    } finally {
        mongo.closeDatabaseConnection();
    }
})

app.post('/challenges', async (req, res, next) => {
    console.log(req.body);
    if (!req.body.name || !req.body.points || !req.body.course) {
        res.status(400).send('Bad request: name, points, course missing')
        return;
    }

    try {
        await mongo.connectToDatabase();
        const newChallenge = req.body;
        await mongo.addChallenge(newChallenge);
        res.status(200).send("Challenge added!")
    } catch (error) {
        console.log(error);
    } finally {
        mongo.closeDatabaseConnection();
    }
});

app.put("/challenges/:id", async (req, res, next) => {
    let {
        id
    } = req.params;

    if (!req.body.name || !req.body.points || !req.body.course) {
        res.status(400).send('Bad request: name, points or course missing')
        return;
    }

    try {
        await mongo.connectToDatabase();
        const updatedChallenge = req.body;
        await mongo.updateChallenge(id, updatedChallenge);
        res.status(200).send("Challenge updated");
    } catch (error) {
        console.log(error)
    } finally {
        mongo.closeDatabaseConnection();
    }

})

app.delete("/challenges/:id", async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        await mongo.connectToDatabase();
        await mongo.deleteChallenge(id);
        res.status(200).send("Challenge deleted");
    } catch (error) {
        console.log(error)
    } finally {
        mongo.closeDatabaseConnection();
    }

})

app.post('/setChallenge', async (req, res, next) => {
    if (!req.body.userId || !req.body.challengeId || !req.body.state) {
        res.status(400).send('Bad request: userId, challengeId or status missing')
        return;
    }


})

app.get('/users', async (req, res, next) => {
    try {
        await mongo.connectToDatabase();
        let users = await mongo.getUsers();
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
    } finally {
        mongo.closeDatabaseConnection();
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})